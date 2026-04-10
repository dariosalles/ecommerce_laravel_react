<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    /**
     * Login de admin
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $admin = Admin::where('email', $validated['email'])->first();

        if (!$admin || !Hash::check($validated['password'], $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['Credenciais inválidas'],
            ]);
        }

        if (!$admin->isActive()) {
            throw ValidationException::withMessages([
                'email' => ['Conta de admin desativada'],
            ]);
        }

        // Atualizar último login
        $admin->updateLastLogin();

        // Gerar token
        $token = $admin->createToken('admin-token', ['admin'])->plainTextToken;

        return response()->json([
            'admin' => $admin,
            'token' => $token,
            'message' => 'Login realizado com sucesso',
        ]);
    }

    /**
     * Obter dados do admin autenticado
     */
    public function admin(Request $request)
    {
        return response()->json($request->user('admin'));
    }

    /**
     * Atualizar perfil do admin
     */
    public function updateProfile(Request $request)
    {
        $admin = $request->user('admin');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
        ]);

        $admin->update($validated);

        return response()->json([
            'admin' => $admin,
            'message' => 'Perfil atualizado com sucesso',
        ]);
    }

    /**
     * Logout do admin
     */
    public function logout(Request $request)
    {
        $request->user('admin')->tokens()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso',
        ]);
    }

    /**
     * Alterar senha do admin
     */
    public function changePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $admin = $request->user('admin');

        if (!Hash::check($validated['current_password'], $admin->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Senha atual inválida'],
            ]);
        }

        $admin->update([
            'password' => $validated['password'],
        ]);

        return response()->json([
            'message' => 'Senha alterada com sucesso',
        ]);
    }
}
