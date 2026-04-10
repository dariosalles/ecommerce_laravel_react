<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AdminManagementController extends Controller
{
    /**
     * Listar todos os admins
     */
    public function index(Request $request)
    {
        $this->authorize('isAdmin', $request->user('admin'));

        $admins = Admin::paginate(50);

        return response()->json($admins);
    }

    /**
     * Criar novo admin
     */
    public function store(Request $request)
    {
        $this->authorize('isSuperAdmin', $request->user('admin'));

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,moderator',
        ]);

        $admin = Admin::create($validated);

        return response()->json([
            'admin' => $admin,
            'message' => 'Admin criado com sucesso',
        ], 201);
    }

    /**
     * Atualizar admin
     */
    public function update(Request $request, $id)
    {
        $this->authorize('isSuperAdmin', $request->user('admin'));

        $admin = Admin::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:admins,email,' . $id,
            'role' => 'sometimes|in:admin,moderator',
            'active' => 'sometimes|boolean',
        ]);

        $admin->update($validated);

        return response()->json([
            'admin' => $admin,
            'message' => 'Admin atualizado com sucesso',
        ]);
    }

    /**
     * Deletar admin
     */
    public function destroy(Request $request, $id)
    {
        $this->authorize('isSuperAdmin', $request->user('admin'));

        if ($id == $request->user('admin')->id) {
            throw ValidationException::withMessages([
                'id' => ['Não pode deletar sua própria conta'],
            ]);
        }

        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json([
            'message' => 'Admin deletado com sucesso',
        ]);
    }

    /**
     * Desativar admin
     */
    public function deactivate(Request $request, $id)
    {
        $this->authorize('isSuperAdmin', $request->user('admin'));

        $admin = Admin::findOrFail($id);
        $admin->update(['active' => false]);

        return response()->json([
            'admin' => $admin,
            'message' => 'Admin desativado com sucesso',
        ]);
    }

    /**
     * Ativar admin
     */
    public function activate(Request $request, $id)
    {
        $this->authorize('isSuperAdmin', $request->user('admin'));

        $admin = Admin::findOrFail($id);
        $admin->update(['active' => true]);

        return response()->json([
            'admin' => $admin,
            'message' => 'Admin ativado com sucesso',
        ]);
    }
}
