import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User, LogOut, Settings } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { cartCount } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-brand-500 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                            <MenuIcon size={24} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-orange-400">
                            EthioBites
                        </span>
                    </Link>

                    <div className="flex flex-1 justify-end items-center space-x-6 sm:space-x-8">
                        <Link
                            to="/menu"
                            className={`font-medium transition-colors ${isActive('/menu') ? 'text-brand-600 font-semibold' : 'text-slate-600 hover:text-brand-500'}`}
                        >
                            Menu
                        </Link>

                        {user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                className={`font-medium transition-colors hidden sm:flex items-center ${isActive('/admin') ? 'text-brand-600 font-semibold' : 'text-slate-600 hover:text-brand-500'}`}
                            >
                                <Settings size={18} className="mr-1" />
                                Admin
                            </Link>
                        )}

                        <Link to="/cart" className="relative p-2 text-slate-600 hover:text-brand-600 transition-colors">
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <div className="flex items-center sm:border-l border-slate-200 sm:pl-6">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link to="/orders" className="text-sm font-medium text-slate-600 hover:text-brand-600 hidden sm:block">
                                        Orders
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-1 bg-slate-900 hover:bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
                                >
                                    <User size={16} />
                                    <span className="hidden sm:inline">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
