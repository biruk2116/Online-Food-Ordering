import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedUsers = localStorage.getItem('users');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else localStorage.setItem('users', JSON.stringify([]));
    setLoading(false);
  }, []);

  const showNotification = (message, type = 'success') => {
    window.dispatchEvent(new CustomEvent('showNotification', { detail: { message, type } }));
  };

  const signup = (name, email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = existingUsers.find(u => u.email === email);
    if (existingUser) {
      showNotification('Email already registered!', 'error');
      return false;
    }
    
    const newUser = { id: Date.now(), name, email, password, role: 'user' };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    showNotification('Account created successfully!', 'success');
    return true;
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      showNotification('Invalid email or password!', 'error');
      return false;
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    showNotification(`Welcome back, ${userWithoutPassword.name}!`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, users, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};