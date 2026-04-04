import React, { createContext, useContext, useState, useEffect } from 'react';

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

const initialFoods = [
  { id: 1, name: "Spicy Burger", price: 12.99, category: "Burger", rating: 4.5, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", shortDescription: "Juicy beef patty with spicy sauce", description: "Our signature spicy burger features a juicy beef patty topped with pepper jack cheese.", calories: 850, carbs: 65, protein: 35 },
  { id: 2, name: "Ethiopian Coffee", price: 3.99, category: "Beverage", rating: 4.8, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop", shortDescription: "Authentic Ethiopian coffee", description: "Traditional Ethiopian coffee made from high-quality Arabica beans.", calories: 5, carbs: 1, protein: 0 },
  { id: 3, name: "Doro Wat", price: 15.99, category: "Ethiopian", rating: 4.9, image: "https://images.unsplash.com/photo-1585937421614-70a008356fbe?w=300&h=200&fit=crop", shortDescription: "Spicy chicken stew with egg", description: "Ethiopia's most famous dish - tender chicken simmered in spicy sauce.", calories: 650, carbs: 45, protein: 42 },
  { id: 4, name: "Kitfo", price: 14.99, category: "Ethiopian", rating: 4.7, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", shortDescription: "Minced raw beef with spices", description: "Premium quality minced beef seasoned with mitmita.", calories: 550, carbs: 15, protein: 48 },
  { id: 5, name: "Shiro Wat", price: 10.99, category: "Ethiopian", rating: 4.6, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", shortDescription: "Chickpea stew", description: "A comforting stew made from ground chickpeas.", calories: 380, carbs: 55, protein: 18 },
  { id: 6, name: "Tej", price: 5.99, category: "Beverage", rating: 4.4, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop", shortDescription: "Honey wine", description: "Traditional Ethiopian honey wine.", calories: 180, carbs: 25, protein: 0 },
  { id: 7, name: "Cheese Burger", price: 11.99, category: "Burger", rating: 4.3, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", shortDescription: "Classic cheeseburger", description: "Classic cheeseburger with melted cheddar cheese.", calories: 780, carbs: 58, protein: 32 },
  { id: 8, name: "Double Burger", price: 15.99, category: "Burger", rating: 4.6, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", shortDescription: "Double patty burger", description: "Two juicy beef patties stacked with double cheese.", calories: 1050, carbs: 72, protein: 52 }
];

const initialCategories = [
  { id: 1, name: 'All', image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
  { id: 2, name: 'Burger', image: "https://cdn-icons-png.flaticon.com/512/1046/1046785.png" },
  { id: 3, name: 'Ethiopian', image: "https://cdn-icons-png.flaticon.com/512/1046/1046786.png" },
  { id: 4, name: 'Beverage', image: "https://cdn-icons-png.flaticon.com/512/1046/1046787.png" }
];

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFoods = localStorage.getItem('foods');
    const savedCategories = localStorage.getItem('categories');
    
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    } else {
      setFoods(initialFoods);
      localStorage.setItem('foods', JSON.stringify(initialFoods));
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(initialCategories);
      localStorage.setItem('categories', JSON.stringify(initialCategories));
    }
    
    setLoading(false);
  }, []);

  const addFood = (food) => {
    const newFood = { ...food, id: Date.now(), rating: 0 };
    const updated = [...foods, newFood];
    setFoods(updated);
    localStorage.setItem('foods', JSON.stringify(updated));
  };

  const updateFood = (id, updatedFood) => {
    const updated = foods.map(food => food.id === id ? { ...food, ...updatedFood } : food);
    setFoods(updated);
    localStorage.setItem('foods', JSON.stringify(updated));
  };

  const deleteFood = (id) => {
    const updated = foods.filter(food => food.id !== id);
    setFoods(updated);
    localStorage.setItem('foods', JSON.stringify(updated));
  };

  const addCategory = (category) => {
    const newCategory = { ...category, id: Date.now() };
    const updated = [...categories, newCategory];
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  const updateCategory = (id, updatedCategory) => {
    const updated = categories.map(cat => cat.id === id ? { ...cat, ...updatedCategory } : cat);
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  const deleteCategory = (id) => {
    const updated = categories.filter(cat => cat.id !== id);
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
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