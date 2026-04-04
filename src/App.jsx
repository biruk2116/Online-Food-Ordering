import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FoodProvider } from './context/FoodContext';
import { OrderProvider } from './context/OrderContext';
import { SettingsProvider } from './context/SettingsContext';
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
import Feedback from './pages/Feedback';

function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const handleNotification = (event) => {
      setNotification(event.detail);
      setTimeout(() => setNotification(null), 3000);
    };
    window.addEventListener('showNotification', handleNotification);
    return () => window.removeEventListener('showNotification', handleNotification);
  }, []);

  return (
    <SettingsProvider>
      <AuthProvider>
        <FoodProvider>
          <CartProvider>
            <OrderProvider>
              <Router>
                <div className="min-h-screen bg-gray-50">
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
                    <Route path="/feedback" element={<Feedback />} />
                  </Routes>
                  
                  {notification && (
                    <div className="fixed bottom-4 right-4 z-50 animate-slideUp">
                      <div className={`px-6 py-3 rounded-lg shadow-lg text-white ${
                        notification.type === 'error' ? 'bg-red-500' : 
                        notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        {notification.message}
                      </div>
                    </div>
                  )}
                </div>
              </Router>
            </OrderProvider>
          </CartProvider>
        </FoodProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;