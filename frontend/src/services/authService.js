import { api, setAuthHeader } from './api.js';

export async function register(payload) {
  const res = await api.post('/auth/register', payload);
  return res.data;
}

export async function login(payload) {
  const res = await api.post('/auth/login', payload);
  return res.data;
}

export async function refreshToken(refreshToken) {
  const res = await api.post('/auth/refresh', { refreshToken });
  return res.data;
}

export async function logout(refreshToken) {
  const res = await api.post('/auth/logout', { refreshToken });
  return res.data;
}

export async function getProfile() {
  const res = await api.get('/auth/profile');
  return res.data;
}
