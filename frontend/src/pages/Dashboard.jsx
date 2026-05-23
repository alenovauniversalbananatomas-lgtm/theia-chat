import React from 'react';
import useAuth from '../hooks/useAuth.js';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm">{user?.username}</div>
            <button onClick={logout} className="text-sm text-red-600">Cerrar sesión</button>
          </div>
        </header>

        <main>
          <section className="p-6 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Proyectos</h2>
            <p className="text-sm text-gray-500">Aquí verás tus proyectos y chats. (Implementación próxima)</p>
          </section>
        </main>
      </div>
    </div>
  );
}
