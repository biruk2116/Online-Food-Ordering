// src/context/AuthContext.jsx (Enhanced)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedUser = storage.get('currentUser');
    const savedUsers = storage.get('users', []);
    if (savedUser) setUser(savedUser);
    setUsers(savedUsers);
    setLoading(false);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const signup = (name, email, password) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      showNotification('Email already registered!', 'error');
      return false;
    }
    
    const newUser = { id: Date.now(), name, email, password, role: 'user' };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    storage.set('users', updatedUsers);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    storage.set('currentUser', userWithoutPassword);
    showNotification('Account created successfully!', 'success');
    return true;
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      showNotification('Invalid email or password!', 'error');
      return false;
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    storage.set('currentUser', userWithoutPassword);
    showNotification(`Welcome back, ${userWithoutPassword.name}!`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.remove('currentUser');
    showNotification('Logged out successfully', 'info');
  };

  const getAllUsers = () => users;

  return (
    <AuthContext.Provider value={{ 
      user, users, loading, login, signup, logout, 
      getAllUsers, notification, showNotification 
    }}>
      {children}
    </AuthContext.Provider>
  );
};