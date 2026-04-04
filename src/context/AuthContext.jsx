// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.get('user');
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, validate credentials
    const mockUser = { id: 1, email, name: email.split('@')[0] };
    setUser(mockUser);
    storage.set('user', mockUser);
    return true;
  };

  const signup = (name, email, password) => {
    const newUser = { id: Date.now(), name, email };
    setUser(newUser);
    storage.set('user', newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.remove('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};