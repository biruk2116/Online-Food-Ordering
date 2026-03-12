import React, { createContext, useState, useEffect } from 'react';
import { initialMenuData } from '../data/menuData';
import { getStoredFoods, saveStoredFoods } from '../utils/localStorage';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        // If not in local storage yet, getStoredFoods returns initialMenuData
        const stored = getStoredFoods(initialMenuData);
        setFoods(stored);
    }, []);

    const addFood = (food) => {
        const newFoods = [...foods, { ...food, id: Date.now() }];
        setFoods(newFoods);
        saveStoredFoods(newFoods);
    };

    const updateFood = (id, updatedFood) => {
        const newFoods = foods.map(f => (f.id === id ? updatedFood : f));
        setFoods(newFoods);
        saveStoredFoods(newFoods);
    };

    const deleteFood = (id) => {
        const newFoods = foods.filter(f => f.id !== id);
        setFoods(newFoods);
        saveStoredFoods(newFoods);
    };

    const filteredFoods = foods.filter(food => {
        const matchesCategory = !activeCategory || food.category === activeCategory;
        const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <FoodContext.Provider value={{
            foods: filteredFoods,
            allFoods: foods,
            addFood,
            updateFood,
            deleteFood,
            searchQuery,
            setSearchQuery,
            activeCategory,
            setActiveCategory
        }}>
            {children}
        </FoodContext.Provider>
    );
};
