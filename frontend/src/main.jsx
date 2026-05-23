import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext.jsx';

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not set in your .env');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
