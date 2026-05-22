import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not set in your .env');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
