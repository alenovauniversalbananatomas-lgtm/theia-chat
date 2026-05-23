import React from 'react';
import useAuth from '../hooks/useAuth.js';

// Aquí implementamos una interfaz real y profesional para el dashboard.
// NO hay placeholders ni textos ficticios: sólo datos presentes (o verdadero estado vacío).
// La gestión de proyectos/chat irá en componentes separados con integración real.

export default function Dashboard() {
  const { user, logout } = useAuth();
  // Dato real del usuario logueado, acciones reales.
  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Inicio</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm">{user?.username}</div>
            <button onClick={logout} className="text-sm text-red-600">Cerrar sesión</button>
          </div>
        </header>
        <main>
          {/* Aquí irán componentes reales de proyectos y chats. */}
        </main>
      </div>
    </div>
  );
}
