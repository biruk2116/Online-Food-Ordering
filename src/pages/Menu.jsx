import React, { useContext, useState, useEffect, useRef } from 'react';
import { FoodContext } from '../context/FoodContext';
import { SettingsContext } from '../context/SettingsContext';
import { AuthContext } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import FoodCard from '../components/FoodCard';
import RecommendationSection from '../components/RecommendationSection';
import { Globe, Zap, Award, Leaf, ShoppingCart } from 'lucide-react';

const Menu = () => {
    const { foods, searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useContext(FoodContext);
    const { backgroundImage } = useContext(SettingsContext);
    const { user } = useContext(AuthContext);
    const [showNoResults, setShowNoResults] = useState(false);
    const noResultsRef = useRef(null);

    useEffect(() => {
        if (foods.length === 0 && searchQuery) {
            setShowNoResults(true);
        } else {
            setShowNoResults(false);
        }
    }, [foods.length, searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (noResultsRef.current && !noResultsRef.current.contains(event.target)) {
                setShowNoResults(false);
                setSearchQuery(''); // Optionally clear search to return to full menu
            }
        };

        if (showNoResults) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNoResults, setSearchQuery]);

    return (
        <div className="animate-fade-in pb-12 overflow-x-hidden">
            {/* Unified Top Section with Hero and Filters */}
            <div 
                className="relative"
                style={backgroundImage ? {
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('${backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                } : {
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/assets/images/hero-bg.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Hero Banner Section */}
                <div className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                            Experience Authentic <br />
                            <span className="text-brand-500 bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-orange-500 drop-shadow-none">Ethiopian</span> Cuisine
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-100 mb-10 font-bold drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] max-w-2xl mx-auto leading-relaxed">
                            Rich flavors, traditional recipes, delivered hot to your door.
                        </p>
                        <button 
                            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                            className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-brand-500/20 transform hover:-translate-y-1"
                        >
                            Explore Menu
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                {foods.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mt-12 animate-fade-in-up">
                        {foods.map(food => (
                            <FoodCard key={food.id} food={food} />
                        ))}
                    </div>
                ) : (
                    showNoResults && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm animate-fade-in">
                            <div 
                                ref={noResultsRef}
                                className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-sm w-full text-center transform animate-scale-in"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 mb-6 text-brand-500">
                                    <ShoppingCart size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">No food matches found</h3>
                                <p className="text-slate-500 font-medium mb-8">Try searching for something else!</p>
                                <button 
                                    onClick={() => {
                                        setShowNoResults(false);
                                        setSearchQuery('');
                                    }}
                                    className="w-full py-4 bg-slate-900 hover:bg-brand-600 text-white rounded-2xl font-bold transition-all shadow-lg"
                                >
                                    View All Menu
                                </button>
                            </div>
                        </div>
                    )
                )}

                {!searchQuery && activeCategory === 'All' && <RecommendationSection />}

                {/* Advanced About Us Section */}
                <section id="about-us" className="min-h-screen flex items-center py-20">
                    <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-slate-900/40 w-full">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 blur-[100px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 blur-[80px] rounded-full -ml-40 -mb-40"></div>
                        
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-xs mb-6 block">Our Story</span>
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
                                    Crafting Memories <br />
                                    <span className="text-slate-400">Since 2010</span>
                                </h2>
                                <p className="text-xl text-slate-400 leading-relaxed font-medium mb-10 max-w-xl">
                                    From the highlands of Ethiopia to your dinner table, we bring the soul of traditional spice and modern zest. EthioBites is more than a delivery service — it's a heritage platform.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                                        <span className="text-sm font-bold text-slate-300">Sustainable Sourcing</span>
                                    </div>
                                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                        <span className="text-sm font-bold text-slate-300">Family Recipes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] transform hover:-translate-y-2 transition-all duration-500 h-64 flex flex-col justify-end group cursor-default">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-500">
                                            <Globe className="text-white" size={24} />
                                        </div>
                                        <h4 className="text-white font-black text-lg">Authentic</h4>
                                        <p className="text-slate-500 text-xs mt-1">100% Ethiopian spices.</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-brand-600 to-orange-600 p-8 rounded-[2.5rem] transform hover:-translate-y-2 transition-all duration-500 h-56 flex flex-col justify-end shadow-xl shadow-brand-600/20 group cursor-default">
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                                            <Zap className="text-white" size={24} />
                                        </div>
                                        <h4 className="text-white font-black text-lg">Fast</h4>
                                        <p className="text-white/70 text-xs mt-1">Average 30min delivery.</p>
                                    </div>
                                </div>
                                <div className="space-y-4 mt-8">
                                    <div className="bg-gradient-to-br from-orange-600 to-brand-600 p-8 rounded-[2.5rem] transform hover:-translate-y-2 transition-all duration-500 h-56 flex flex-col justify-end shadow-xl shadow-orange-600/20 group cursor-default">
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                                            <Award className="text-white" size={24} />
                                        </div>
                                        <h4 className="text-white font-black text-lg">Premium</h4>
                                        <p className="text-white/70 text-xs mt-1">Top-rated chefs.</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] transform hover:-translate-y-2 transition-all duration-500 h-64 flex flex-col justify-end group cursor-default">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-green-500 group-hover:border-green-500 transition-all duration-500">
                                            <Leaf className="text-white" size={24} />
                                        </div>
                                        <h4 className="text-white font-black text-lg">Fresh</h4>
                                        <p className="text-slate-500 text-xs mt-1">Daily fresh ingredients.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Menu;
