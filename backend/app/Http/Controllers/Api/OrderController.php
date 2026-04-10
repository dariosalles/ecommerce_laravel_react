<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Listar pedidos do usuário autenticado
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $orders = Order::where('user_id', $user->id)
            ->with(['items', 'paymentMethod', 'shippingMethod'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($orders);
    }

    /**
     * Obter detalhes de um pedido específico
     */
    public function show($id)
    {
        $order = Order::with(['user', 'items.product', 'paymentMethod', 'shippingMethod'])
            ->findOrFail($id);

        return response()->json($order);
    }

    /**
     * Criar novo pedido
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string',
            'billing_address' => 'nullable|string',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'shipping_method_id' => 'required|exists:shipping_methods,id',
            'notes' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            $user = $request->user();
            
            // Calcular subtotal
            $subtotal = 0;
            $items_data = [];

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                // Verificar estoque
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Produto '{$product->name}' não possui estoque suficiente.");
                }

                $price = $product->price;
                $item_subtotal = $price * $item['quantity'];
                $subtotal += $item_subtotal;

                $items_data[] = [
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price_at_purchase' => $price,
                    'subtotal' => $item_subtotal,
                ];
            }

            // Criar pedido
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => Order::generateOrderNumber(),
                'subtotal' => $subtotal,
                'shipping_cost' => 0, // Será calculado
                'tax' => 0, // Será calculado
                'discount' => 0,
                'total' => $subtotal,
                'status' => 'pending',
                'payment_method_id' => $validated['payment_method_id'],
                'shipping_method_id' => $validated['shipping_method_id'],
                'shipping_address' => $validated['shipping_address'],
                'billing_address' => $validated['billing_address'] ?? $validated['shipping_address'],
                'notes' => $validated['notes'] ?? null,
            ]);

            // Criar itens do pedido
            foreach ($items_data as $item_data) {
                OrderItem::create(array_merge($item_data, ['order_id' => $order->id]));

                // Decrementar estoque do produto
                $product = Product::find($item_data['product_id']);
                $product->decrement('stock', $item_data['quantity']);
            }

            // Atualizar total
            $order->updateTotal();

            DB::commit();

            return response()->json([
                'message' => 'Pedido criado com sucesso',
                'order' => $order->load(['items', 'paymentMethod', 'shippingMethod']),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Cancelar um pedido
     */
    public function cancel($id, Request $request)
    {
        $order = Order::findOrFail($id);
        
        // Verificar se o pedido pertence ao usuário autenticado
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Não autorizado'], 403);
        }

        // Só pode cancelar se estiver pending ou processing
        if (!in_array($order->status, ['pending', 'processing'])) {
            return response()->json(['error' => 'Não é possível cancelar este pedido'], 422);
        }

        try {
            DB::beginTransaction();

            // Devolver estoque
            foreach ($order->items as $item) {
                $item->product->increment('stock', $item->quantity);
            }

            // Cancelar pedido
            $order->cancel($request->input('reason'));

            DB::commit();

            return response()->json([
                'message' => 'Pedido cancelado com sucesso',
                'order' => $order,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Atualizar status de um pedido (apenas admin)
     */
    public function updateStatus($id, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
            'tracking_code' => 'nullable|string',
        ]);

        $order = Order::findOrFail($id);

        // Apenas admin pode atualizar status
        // TODO: Implementar verificação de role admin

        $order->update([
            'status' => $validated['status'],
            'tracking_code' => $validated['tracking_code'] ?? $order->tracking_code,
        ]);

        if ($validated['status'] === 'shipped') {
            $order->markAsShipped($validated['tracking_code'] ?? null);
        } elseif ($validated['status'] === 'delivered') {
            $order->markAsDelivered();
        }

        return response()->json([
            'message' => 'Status do pedido atualizado',
            'order' => $order,
        ]);
    }

    /**
     * Listar todos os pedidos (apenas admin)
     */
    public function allOrders(Request $request)
    {
        // TODO: Verificar se é admin

        $query = Order::with(['user', 'items.product', 'paymentMethod', 'shippingMethod']);

        // Filtrar por status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filtrar por data
        if ($request->has('from_date') && $request->has('to_date')) {
            $query->whereBetween('created_at', [
                $request->from_date,
                $request->to_date,
            ]);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($orders);
    }

    /**
     * Estatísticas de pedidos
     */
    public function statistics(Request $request)
    {
        return response()->json([
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'processing_orders' => Order::where('status', 'processing')->count(),
            'shipped_orders' => Order::where('status', 'shipped')->count(),
            'delivered_orders' => Order::where('status', 'delivered')->count(),
            'cancelled_orders' => Order::where('status', 'cancelled')->count(),
            'total_revenue' => Order::where('status', 'delivered')->sum('total'),
        ]);
    }
}
