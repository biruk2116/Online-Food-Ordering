import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User, LogOut, Settings, Search } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FoodContext } from '../context/FoodContext';
import SearchBar from './SearchBar';

const Navbar = () => {
    const { cartCount } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useContext(FoodContext);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const categories = ['All', 'Traditional', 'Fast Food', 'Traditional Drinks', 'Modern Drinks', 'Other Drinks', 'Desserts'];

    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-brand-600 text-white p-2.5 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-brand-500/20">
                            <MenuIcon size={24} />
                        </div>
                        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-orange-500 tracking-tight">
                            EthioBites
                        </span>
                    </Link>

                    {/* Integrated Search (Large Screen) */}
                    <div className="hidden lg:flex items-center flex-1 max-w-sm mx-12">
                        <SearchBar 
                            value={searchQuery} 
                            onChange={(val) => {
                                setSearchQuery(val);
                                if (val !== '') setActiveCategory('All');
                            }} 
                        />
                    </div>

                    {/* Navigation Items */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Link
                            to="/menu"
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/menu') ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-500'}`}
                        >
                            Menu
                        </Link>

                        {/* Category Dropdown */}
                        <div className="relative group hidden sm:block">
                            <button className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl text-sm font-extrabold text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-all duration-300">
                                <span>Menu</span>
                                <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            <div className="absolute top-[calc(100%+8px)] right-0 w-64 bg-white/95 backdrop-blur-2xl border border-white/50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] opacity-0 -translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 overflow-hidden z-50 p-3">
                                <div className="space-y-1">
                                    <div className="px-4 py-2 mb-2">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories</p>
                                    </div>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setActiveCategory(cat);
                                                if (location.pathname !== '/menu') navigate('/menu');
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-between group/item ${activeCategory === cat ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'}`}
                                        >
                                            <span>{cat === 'All' ? 'All Cravings' : cat}</span>
                                            {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/orders"
                            className={`hidden md:block px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all duration-300 ${isActive('/orders') ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'}`}
                        >
                            Orders
                        </Link>

                        <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>

                        {user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                className={`p-2.5 rounded-2xl transition-all ${isActive('/admin') ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                <Settings size={20} />
                            </Link>
                        )}

                        {user?.role !== 'admin' && (
                            <Link to="/cart" className="relative p-2.5 bg-brand-600 text-white rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transform hover:-translate-y-0.5">
                                <ShoppingCart size={20} strokeWidth={2.5} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white ring-2 ring-brand-100">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {!user ? (
                            <Link
                                to="/login"
                                className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-brand-600 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                            >
                                Login
                            </Link>
                        ) : (
                            <button
                                onClick={logout}
                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
