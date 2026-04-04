// src/context/SettingsContext.jsx (Enhanced)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = storage.get('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      storage.set('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      storage.set('theme', 'light');
    }
  }, [isDark]);

  return (
    <SettingsContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </SettingsContext.Provider>
  );
};