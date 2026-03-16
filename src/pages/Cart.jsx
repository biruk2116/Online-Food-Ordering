import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                        <ShoppingBag size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
                    <p className="text-slate-500 mb-8 max-w-md">Looks like you haven't added any delicious meals to your cart yet.</p>
                    <Link
                        to="/menu"
                        className="px-8 py-3 bg-brand-600 text-white rounded-xl shadow-md hover:bg-brand-700 transition-all font-medium flex items-center shadow-brand-500/20"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Browse Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
                    <ShoppingBag className="mr-3 text-brand-500" size={32} />
                    Your Cart
                </h1>
                <button
                    onClick={clearCart}
                    className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors self-start sm:self-auto"
                >
                    Clear All Items
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="space-y-4">
                        {cart.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span className="font-medium">{cartTotal} ETB</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Delivery Fee</span>
                                <span className="font-medium">50 ETB</span>
                            </div>
                            <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-xl text-slate-900">
                                <span>Total</span>
                                <span className="text-brand-600">{cartTotal + 50} ETB</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold shadow-lg hover:bg-brand-700 hover:shadow-xl transition-all flex justify-center items-center shadow-brand-500/30"
                        >
                            Proceed to Checkout
                        </button>

                        <Link
                            to="/menu"
                            className="mt-6 block text-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
