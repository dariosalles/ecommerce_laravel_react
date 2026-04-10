<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\Admin;

class AuthenticateAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Buscar o token no banco de dados
        $personalAccessToken = PersonalAccessToken::findToken($token);

        if (!$personalAccessToken || !in_array('admin', $personalAccessToken->abilities)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Carregar o admin
        $admin = Admin::find($personalAccessToken->tokenable_id);

        if (!$admin || !$admin->isActive()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Definir o admin no request
        $request->setUserResolver(function () use ($admin) {
            return $admin;
        });

        return $next($request);
    }
}
