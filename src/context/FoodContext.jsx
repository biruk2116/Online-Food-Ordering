// src/context/FoodContext.jsx (Enhanced with Categories)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialFoods, initialCategories } from '../data/menuData';
import { storage } from '../utils/localStorage';

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFoods = storage.get('foods');
    const savedCategories = storage.get('categories');
    
    if (savedFoods && savedFoods.length) {
      setFoods(savedFoods);
    } else {
      setFoods(initialFoods);
      storage.set('foods', initialFoods);
    }
    
    if (savedCategories && savedCategories.length) {
      setCategories(savedCategories);
    } else {
      setCategories(initialCategories);
      storage.set('categories', initialCategories);
    }
    
    setLoading(false);
  }, []);

  // Food operations
  const addFood = (food) => {
    const newFood = { ...food, id: Date.now(), rating: 0 };
    const updated = [...foods, newFood];
    setFoods(updated);
    storage.set('foods', updated);
  };

  const updateFood = (id, updatedFood) => {
    const updated = foods.map(food => food.id === id ? { ...food, ...updatedFood } : food);
    setFoods(updated);
    storage.set('foods', updated);
  };

  const deleteFood = (id) => {
    const updated = foods.filter(food => food.id !== id);
    setFoods(updated);
    storage.set('foods', updated);
  };

  // Category operations
  const addCategory = (category) => {
    const newCategory = { ...category, id: Date.now() };
    const updated = [...categories, newCategory];
    setCategories(updated);
    storage.set('categories', updated);
  };

  const updateCategory = (id, updatedCategory) => {
    const updated = categories.map(cat => cat.id === id ? { ...cat, ...updatedCategory } : cat);
    setCategories(updated);
    storage.set('categories', updated);
  };

  const deleteCategory = (id) => {
    const updated = categories.filter(cat => cat.id !== id);
    setCategories(updated);
    storage.set('categories', updated);
  };

  return (
    <FoodContext.Provider value={{
      foods, categories, loading,
      addFood, updateFood, deleteFood,
      addCategory, updateCategory, deleteCategory
    }}>
      {children}
    </FoodContext.Provider>
  );
};