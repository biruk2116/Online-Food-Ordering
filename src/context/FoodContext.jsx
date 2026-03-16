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
        const newFoods = foods.map(f => (f.id === id ? { ...f, ...updatedFood } : f));
        setFoods(newFoods);
        saveStoredFoods(newFoods);
    };

    const deleteFood = (id) => {
        const newFoods = foods.filter(f => f.id !== id);
        setFoods(newFoods);
        saveStoredFoods(newFoods);
    };

    const rateFood = (foodId, userId, ratingValue) => {
        const food = foods.find(f => f.id === foodId);
        if (!food) return;

        const currentRatings = food.ratings || [];
        const userRatingIndex = currentRatings.findIndex(r => r.userId === userId);
        
        let newRatings = [...currentRatings];
        if (userRatingIndex !== -1) {
            newRatings[userRatingIndex].rating = ratingValue;
        } else {
            newRatings.push({ userId, rating: ratingValue });
        }

        const total = newRatings.reduce((sum, r) => sum + r.rating, 0);
        const newAverage = newRatings.length > 0 ? (total / newRatings.length) : 0;

        updateFood(foodId, { ...food, ratings: newRatings, rating: newAverage });
    };

    const filteredFoods = foods.filter(food => {
        const matchesCategory = !activeCategory || activeCategory === 'All' || food.category === activeCategory;
        const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Auto-reset search if no matches found
    useEffect(() => {
        if (searchQuery !== '' && filteredFoods.length === 0) {
            setSearchQuery('');
        }
    }, [searchQuery, filteredFoods.length]);

    return (
        <FoodContext.Provider value={{
            foods: filteredFoods,
            allFoods: foods,
            addFood,
            updateFood,
            deleteFood,
            rateFood,
            searchQuery,
            setSearchQuery,
            activeCategory,
            setActiveCategory
        }}>
            {children}
        </FoodContext.Provider>
    );
};
