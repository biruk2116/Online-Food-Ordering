import React, { useState, useEffect } from 'react';
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
import About from './pages/About';
import Contact from './pages/Contact';

// Simple Context Providers
const AuthContext = React.createContext();
const CartContext = React.createContext();
const FoodContext = React.createContext();
const OrderContext = React.createContext();
const SettingsContext = React.createContext();

// Initial Data
const initialFoods = [
  { id: 1, name: "Spicy Burger", price: 12.99, category: "Burger", rating: 4.5, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", shortDescription: "Juicy beef patty with spicy sauce", description: "Our signature spicy burger features a juicy beef patty topped with pepper jack cheese.", calories: 850, carbs: 65, protein: 35, fats: 42 },
  { id: 2, name: "Ethiopian Coffee", price: 3.99, category: "Beverage", rating: 4.8, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop", shortDescription: "Authentic Ethiopian coffee", description: "Traditional Ethiopian coffee made from high-quality Arabica beans.", calories: 5, carbs: 1, protein: 0, fats: 0 },
  { id: 3, name: "Doro Wat", price: 15.99, category: "Ethiopian", rating: 4.9, image: "https://images.unsplash.com/photo-1585937421614-70a008356fbe?w=300&h=200&fit=crop", shortDescription: "Spicy chicken stew with egg", description: "Ethiopia's most famous dish - tender chicken simmered in spicy sauce.", calories: 650, carbs: 45, protein: 42, fats: 38 },
  { id: 4, name: "Kitfo", price: 14.99, category: "Ethiopian", rating: 4.7, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", shortDescription: "Minced raw beef with spices", description: "Premium quality minced beef seasoned with mitmita.", calories: 550, carbs: 15, protein: 48, fats: 35 },
  { id: 5, name: "Shiro Wat", price: 10.99, category: "Ethiopian", rating: 4.6, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", shortDescription: "Chickpea stew", description: "A comforting stew made from ground chickpeas.", calories: 380, carbs: 55, protein: 18, fats: 12 },
  { id: 6, name: "Tej", price: 5.99, category: "Beverage", rating: 4.4, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop", shortDescription: "Honey wine", description: "Traditional Ethiopian honey wine.", calories: 180, carbs: 25, protein: 0, fats: 0 }
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
  const [categories] = useState(initialCategories);
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
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
    showNotification('Invalid credentials', 'error');
    return false;
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      showNotification('Email already exists', 'error');
      return false;
    }
    const newUser = { id: Date.now(), name, email, password, role: 'user' };
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
    showNotification('Logged out', 'info');
  };

  const addToCart = (food, quantity = 1) => {
    if (!user) {
      showNotification('Please login first!', 'error');
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
    showNotification('Item removed', 'info');
  };

  const getTotalPrice = () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const getItemCount = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const placeOrder = (orderData) => {
    const newOrder = { id: Date.now(), ...orderData, userId: user?.id, userName: user?.name, date: new Date().toISOString(), status: 'Pending' };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
    showNotification('Order placed successfully!');
    return newOrder;
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const authValue = { user, login, signup, logout };
  const cartValue = { cartItems, addToCart, updateQuantity, removeFromCart, getTotalPrice, getItemCount };
  const foodValue = { foods, categories };
  const orderValue = { orders, placeOrder, getUserOrders: () => orders.filter(o => o.userId === user?.id) };
  const settingsValue = { isDark, setIsDark };

  return (
    <SettingsContext.Provider value={settingsValue}>
      <AuthContext.Provider value={authValue}>
        <CartContext.Provider value={cartValue}>
          <FoodContext.Provider value={foodValue}>
            <OrderContext.Provider value={orderValue}>
              <Router>
                <div style={{ minHeight: '100vh', backgroundColor: isDark ? '#111827' : '#f9fafb' }}>
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
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                  {notification && (
                    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
                      <div style={{ padding: '12px 24px', borderRadius: 8, backgroundColor: notification.type === 'error' ? '#ef4444' : '#10b981', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
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

// Hooks
export const useAuth = () => React.useContext(AuthContext);
export const useCart = () => React.useContext(CartContext);
export const useFood = () => React.useContext(FoodContext);
export const useOrders = () => React.useContext(OrderContext);
export const useSettings = () => React.useContext(SettingsContext);

export default App;