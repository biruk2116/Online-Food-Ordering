import React, { createContext, useState, useEffect } from 'react';
import { getStoredUser, saveStoredUser } from '../utils/localStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (email, password) => {
        // Simulated login
        const isAdmin = email === 'admin@food.com';
        const loggedInUser = { email, role: isAdmin ? 'admin' : 'customer' };
        setUser(loggedInUser);
        saveStoredUser(loggedInUser);
        return true;
    };

    const signup = (name, email, password) => {
        // Simulated signup
        const newUser = { name, email, role: 'customer' };
        setUser(newUser);
        saveStoredUser(newUser);
        return true;
    };

    const logout = () => {
        setUser(null);
        saveStoredUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
