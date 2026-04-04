// src/context/FoodContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialFoods } from '../data/menuData';
import { storage } from '../utils/localStorage';

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFoods = storage.get('foods');
    if (savedFoods && savedFoods.length) {
      setFoods(savedFoods);
    } else {
      setFoods(initialFoods);
      storage.set('foods', initialFoods);
    }
    setLoading(false);
  }, []);

  const addFood = (food) => {
    const newFood = { ...food, id: Date.now() };
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

  return (
    <FoodContext.Provider value={{ foods, loading, addFood, updateFood, deleteFood }}>
      {children}
    </FoodContext.Provider>
  );
};