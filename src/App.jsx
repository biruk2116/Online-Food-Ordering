import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import FoodDetails from './pages/FoodDetails';
import Account from './pages/Account';

// Contexts
const AuthContext = createContext();
const CartContext = createContext();
const FoodContext = createContext();
const OrderContext = createContext();
const SettingsContext = createContext();

// Initial Data
const initialFoods = [
  { 
    id: 1, name: "Spicy Burger", price: 12.99, category: "Burger", rating: 4.5, 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", 
    shortDescription: "Juicy beef patty with spicy sauce", 
    description: "Our signature spicy burger features a juicy beef patty topped with pepper jack cheese, crispy lettuce, tomatoes, onions, and our secret spicy sauce.",
    nutrition: { calories: 850, carbs: 65, protein: 35, fats: 42 }
  },
  { 
    id: 2, name: "Ethiopian Coffee", price: 3.99, category: "Beverage", rating: 4.8, 
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
    shortDescription: "Authentic Ethiopian coffee",
    description: "Traditional Ethiopian coffee made from high-quality Arabica beans, roasted and brewed fresh.",
    nutrition: { calories: 5, carbs: 1, protein: 0, fats: 0 }
  },
  { 
    id: 3, name: "Doro Wat", price: 15.99, category: "Ethiopian", rating: 4.9, 
    image: "https://images.unsplash.com/photo-1585937421614-70a008356fbe?w=400&h=300&fit=crop",
    shortDescription: "Spicy chicken stew with egg",
    description: "Ethiopia's most famous dish - tender chicken simmered in a spicy berbere sauce.",
    nutrition: { calories: 650, carbs: 45, protein: 42, fats: 38 }
  },
  { 
    id: 4, name: "Kitfo", price: 14.99, category: "Ethiopian", rating: 4.7, 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    shortDescription: "Minced raw beef with spices",
    description: "Premium quality minced beef seasoned with mitmita and kibe.",
    nutrition: { calories: 550, carbs: 15, protein: 48, fats: 35 }
  },
  { 
    id: 5, name: "Shiro Wat", price: 10.99, category: "Ethiopian", rating: 4.6, 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    shortDescription: "Chickpea stew",
    description: "A comforting stew made from ground chickpeas and broad beans.",
    nutrition: { calories: 380, carbs: 55, protein: 18, fats: 12 }
  },
  { 
    id: 6, name: "Tej", price: 5.99, category: "Beverage", rating: 4.4, 
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
    shortDescription: "Honey wine",
    description: "Traditional Ethiopian honey wine.",
    nutrition: { calories: 180, carbs: 25, protein: 0, fats: 0 }
  }
];

const initialCategories = [
  { id: 1, name: 'All', image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
  { id: 2, name: 'Burger', image: "https://cdn-icons-png.flaticon.com/512/1046/1046785.png" },
  { id: 3, name: 'Ethiopian', image: "https://cdn-icons-png.flaticon.com/512/1046/1046786.png" },
  { id: 4, name: 'Beverage', image: "https://cdn-icons-png.flaticon.com/512/1046/1046787.png" }
];

function App() {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState(initialFoods);
  const [categories, setCategories] = useState(initialCategories);
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    const savedOrders = localStorage.getItem('orders');
    const savedFoods = localStorage.getItem('foods');
    const savedCategories = localStorage.getItem('categories');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedFoods) setFoods(JSON.parse(savedFoods));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('foods', JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      showNotification(`Welcome back, ${userData.name}!`);
      return true;
    }
    showNotification('Invalid email or password', 'error');
    return false;
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      showNotification('Email already exists', 'error');
      return false;
    }
    const newUser = { id: Date.now(), name, email, password, role: email === 'admin@foodie.com' ? 'admin' : 'user', createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    showNotification('Account created successfully!');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    showNotification('Logged out successfully', 'info');
  };

  const addToCart = (food, quantity = 1) => {
    if (!user) {
      showNotification('Please login first to add items to cart!', 'error');
      return false;
    }
    setCartItems(prev => {
      const existing = prev.find(i => i.id === food.id);
      if (existing) {
        return prev.map(i => i.id === food.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...food, quantity }];
    });
    showNotification(`${food.name} added to cart!`);
    return true;
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(i => i.id !== id));
    } else {
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    }
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    showNotification('Item removed from cart', 'info');
  };

  const getTotalPrice = () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const getItemCount = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const placeOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      orderNumber: `ORD-${Date.now()}`,
      ...orderData,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      date: new Date().toISOString(),
      status: 'Pending',
      deliveryStatus: 'Processing'
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    setCartItems([]);
    showNotification('Order placed successfully!');
    return newOrder;
  };

  const addFood = (food) => {
    const newFood = { ...food, id: Date.now(), rating: 4.5 };
    setFoods(prev => [...prev, newFood]);
    showNotification('Food added successfully!');
  };

  const updateFood = (id, updatedFood) => {
    setFoods(prev => prev.map(f => f.id === id ? { ...f, ...updatedFood } : f));
    showNotification('Food updated successfully!');
  };

  const deleteFood = (id) => {
    setFoods(prev => prev.filter(f => f.id !== id));
    showNotification('Food deleted successfully!');
  };

  const addCategory = (category) => {
    const newCategory = { ...category, id: Date.now() };
    setCategories(prev => [...prev, newCategory]);
    showNotification('Category added successfully!');
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedCategory } : c));
    showNotification('Category updated successfully!');
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showNotification('Category deleted successfully!');
  };

  const authValue = { user, login, signup, logout };
  const cartValue = { cartItems, addToCart, updateQuantity, removeFromCart, getTotalPrice, getItemCount };
  const foodValue = { foods, categories, addFood, updateFood, deleteFood, addCategory, updateCategory, deleteCategory };
  const orderValue = { orders, placeOrder, getUserOrders: () => orders.filter(o => o.userId === user?.id), getAllOrders: () => orders };
  const settingsValue = { isDark, setIsDark };

  return (
    <SettingsContext.Provider value={settingsValue}>
      <AuthContext.Provider value={authValue}>
        <CartContext.Provider value={cartValue}>
          <FoodContext.Provider value={foodValue}>
            <OrderContext.Provider value={orderValue}>
              <Router>
                <div style={{ minHeight: '100vh', backgroundColor: isDark ? '#0f172a' : '#f8fafc' }}>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/food/:id" element={<FoodDetails />} />
                    <Route path="/account" element={<Account />} />
                  </Routes>
                  
                  {/* Notification Toast */}
                  {notification && (
                    <div className="fixed bottom-4 right-4 z-50 animate-fadeInUp">
                      <div className={`px-6 py-3 rounded-lg shadow-lg text-white ${
                        notification.type === 'error' ? 'bg-red-500' : 
                        notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {notification.message}
                      </div>
                    </div>
                  )}
                </div>
              </Router>
            </OrderContext.Provider>
          </FoodContext.Provider>
        </CartContext.Provider>
      </AuthContext.Provider>
    </SettingsContext.Provider>
  );
}

// Custom Hooks
export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
export const useFood = () => useContext(FoodContext);
export const useOrders = () => useContext(OrderContext);
export const useSettings = () => useContext(SettingsContext);

export default App;