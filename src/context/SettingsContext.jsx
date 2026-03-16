import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        const storedImage = localStorage.getItem('app_background');
        if (storedImage) {
            setBackgroundImage(storedImage);
        }
    }, []);

    const updateBackgroundImage = (imageUrl) => {
        setBackgroundImage(imageUrl);
        if (imageUrl) {
            localStorage.setItem('app_background', imageUrl);
        } else {
            localStorage.removeItem('app_background');
        }
    };

    return (
        <SettingsContext.Provider value={{ backgroundImage, updateBackgroundImage }}>
            {children}
        </SettingsContext.Provider>
    );
};
