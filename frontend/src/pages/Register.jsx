import React, { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ username, email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registro falló');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Usuario</label>
            <input value={username} onChange={e => setUsername(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" type="email" required />
          </div>
          <div>
            <label className="block text-sm">Contraseña</label>
            <input value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" type="password" required />
          </div>
          <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">{loading ? 'Creando...' : 'Crear cuenta'}</button>
        </form>
        <p className="mt-4 text-sm">¿Ya tienes cuenta? <Link className="text-blue-600" to="/login">Entrar</Link></p>
      </div>
    </div>
  );
}
