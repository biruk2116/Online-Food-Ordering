import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User, LogOut, Settings, Search, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { FoodProvider } from './context/FoodContext';
import { CartProvider } from './context/CartContext';
import { SettingsProvider, SettingsContext } from './context/SettingsContext';
import { OrderProvider } from './context/OrderContext';

import Navbar from './components/Navbar';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/AdminDashboard';

// Custom component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

// Main App Provider Wrapper
const AppContent = () => {
  return (
    <div className="min-h-screen font-sans flex flex-col selection:bg-brand-500 selection:text-white transition-all duration-700 bg-slate-50">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/menu" />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="bg-slate-950 pt-24 pb-12 z-10 relative overflow-hidden">
        {/* Footer Design Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
            {/* Brand Column */}
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <Link to="/" className="flex items-center space-x-3 mb-8">
                <div className="bg-brand-600 text-white p-2.5 rounded-2xl shadow-lg shadow-brand-500/20">
                  <MenuIcon size={22} />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">
                  EthioBites
                </span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs">
                The pinnacle of Ethiopian culinary excellence, delivered with precision and pride. Experience the tradition reimagined for the modern world.
              </p>
              <div className="flex items-center gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <div key={i} className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-xl">
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>

            {/* Links Column 1 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Explore</h4>
              <ul className="space-y-4">
                {['Today\'s Menu', 'Order Tracking', 'Our Story', 'Special Offers'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 hover:text-brand-400 text-sm font-bold transition-colors block py-1">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Support</h4>
              <ul className="space-y-4">
                {['Help Center', 'Privacy Policy', 'Terms of Service', 'Carrier Program'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 hover:text-brand-400 text-sm font-bold transition-colors block py-1">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Contact</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                   <div className="w-11 h-11 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <Phone size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Call Us</p>
                      <p className="text-white font-bold text-sm">+251 911 234 567</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                   <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      <Mail size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Email Us</p>
                      <p className="text-white font-bold text-sm font-mono">hello@ethiobites.com</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-[11px] font-bold tracking-tight">
              &copy; {new Date().getFullYear()} EthioBites Delivery. All rights reserved.
            </p>
            <div className="flex gap-8">
               <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-slate-400 transition-colors">Privacy</span>
               <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-slate-400 transition-colors">Terms</span>
               <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-slate-400 transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AuthProvider>
          <FoodProvider>
            <OrderProvider>
              <CartProvider>
                <AppContent />
              </CartProvider>
            </OrderProvider>
          </FoodProvider>
        </AuthProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
