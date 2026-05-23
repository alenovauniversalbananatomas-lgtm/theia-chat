import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import * as authApi from '../services/authService.js';
import { setAuthHeader } from '../services/api.js';

const AuthContext = createContext(null);

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimeoutRef = useRef(null);

  useEffect(() => {
    // Initialize from localStorage
    const localToken = localStorage.getItem('theia_token');
    const localRefresh = localStorage.getItem('theia_refresh');
    if (localToken) {
      setToken(localToken);
      setAuthHeader(localToken);
    }
    if (localRefresh) setRefreshToken(localRefresh);

    async function bootstrap() {
      if (localToken) {
        try {
          const { user } = await authApi.getProfile();
          setUser(user);
          scheduleRefresh(localToken, localRefresh);
        } catch (err) {
          // try to refresh
          if (localRefresh) {
            try {
              const { token: newToken } = await authApi.refreshToken(localRefresh);
              handleNewToken(newToken, localRefresh);
              const { user } = await authApi.getProfile();
              setUser(user);
            } catch (_) {
              clearAuth();
            }
          } else {
            clearAuth();
          }
        }
      }
      setLoading(false);
    }

    bootstrap();

    return () => {
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleNewToken(newToken, newRefresh) {
    setToken(newToken);
    setRefreshToken(newRefresh || refreshToken);
    localStorage.setItem('theia_token', newToken);
    if (newRefresh) localStorage.setItem('theia_refresh', newRefresh);
    setAuthHeader(newToken);
    scheduleRefresh(newToken, newRefresh || refreshToken);
  }

  function scheduleRefresh(currentToken, currentRefresh) {
    if (!currentToken || !currentRefresh) return;
    const payload = parseJwt(currentToken);
    if (!payload || !payload.exp) return;
    const expiresAt = payload.exp * 1000;
    const now = Date.now();
    const msUntil = expiresAt - now;
    // schedule a refresh 60 seconds before expiry or at half the remaining time if short
    const refreshIn = Math.max(1000, msUntil - 60000);
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    refreshTimeoutRef.current = setTimeout(async () => {
      try {
        const { token: newToken } = await authApi.refreshToken(currentRefresh);
        handleNewToken(newToken, currentRefresh);
      } catch (err) {
        // failed to refresh -> clear auth
        clearAuth();
      }
    }, refreshIn);
  }

  function clearAuth() {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('theia_token');
    localStorage.removeItem('theia_refresh');
    setAuthHeader(null);
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
  }

  async function login({ email, password }) {
    const data = await authApi.login({ email, password });
    const { token: tkn, refreshToken: rtk, user } = data;
    handleNewToken(tkn, rtk);
    setUser(user);
    return user;
  }

  async function register(payload) {
    const data = await authApi.register(payload);
    const { token: tkn, refreshToken: rtk, user } = data;
    handleNewToken(tkn, rtk);
    setUser(user);
    return user;
  }

  async function logout() {
    try {
      if (refreshToken) await authApi.logout(refreshToken);
    } catch (err) {
      // ignore
    }
    clearAuth();
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
