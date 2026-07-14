import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Local fallback storage for when server is not available
const LOCAL_USERS_KEY = 'logrecap_local_users';

// Seed a default admin user
const getLocalUsers = () => {
  try {
    const data = localStorage.getItem(LOCAL_USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalUsers = (users) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('logrecap_token');
    const storedUser = localStorage.getItem('logrecap_user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('logrecap_token');
        localStorage.removeItem('logrecap_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    // Try server first
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('logrecap_token', data.token);
        localStorage.setItem('logrecap_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
      }
    } catch {
      // Server not available, try local
    }

    // Fallback: local storage auth
    const localUsers = getLocalUsers();
    const found = localUsers.find(u => u.email === email || u.username === email);
    if (found && found.password === password) {
      const userData = {
        id: found.id,
        username: found.username,
        fullName: found.fullName,
        email: found.email,
        bio: found.bio || '',
        totalPoints: found.totalPoints || 0,
        streak: found.streak || 0,
      };
      const fakeToken = 'local_' + btoa(JSON.stringify({ id: found.id, email: found.email }));
      localStorage.setItem('logrecap_token', fakeToken);
      localStorage.setItem('logrecap_user', JSON.stringify(userData));
      setToken(fakeToken);
      setUser(userData);
      setIsAuthenticated(true);
      return { token: fakeToken, user: userData };
    }

    throw new Error('Invalid credentials. Server may be offline. Use local account or start the backend.');
  }, []);

  const register = useCallback(async (userData) => {
    // Try server first
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('logrecap_token', data.token);
        localStorage.setItem('logrecap_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
      }
    } catch {
      // Server not available, save locally
    }

    // Fallback: save to localStorage
    const localUsers = getLocalUsers();
    const exists = localUsers.find(u => u.email === userData.email || u.username === userData.username);
    if (exists) {
      throw new Error('Username or email already taken');
    }

    const newUser = {
      id: Date.now(),
      username: userData.username,
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      bio: '',
      totalPoints: 0,
      streak: 0,
      createdAt: new Date().toISOString(),
    };

    saveLocalUsers([...localUsers, newUser]);

    const userPayload = {
      id: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
      email: newUser.email,
      bio: newUser.bio,
      totalPoints: newUser.totalPoints,
      streak: newUser.streak,
    };

    const fakeToken = 'local_' + btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));
    localStorage.setItem('logrecap_token', fakeToken);
    localStorage.setItem('logrecap_user', JSON.stringify(userPayload));
    setToken(fakeToken);
    setUser(userPayload);
    setIsAuthenticated(true);
    return { token: fakeToken, user: userPayload };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('logrecap_token');
    localStorage.removeItem('logrecap_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('logrecap_user', JSON.stringify(updatedUser));
  }, []);

  const refreshUser = useCallback(async () => {
    const storedToken = token || localStorage.getItem('logrecap_token');
    if (!storedToken) return;
    try {
      const res = await fetch(`${API_BASE}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('logrecap_user', JSON.stringify(data.user));
        return data.user;
      }
    } catch (err) {
      console.error('Failed to refresh user stats:', err);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, loading, login, register, logout, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};