import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';
import { saveStoredOrder } from '../utils/localStorage';
import { CheckCircle2 } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { addOrder } = useContext(OrderContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: '',
        address: '',
        paymentMethod: '',
        accountNumber: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPaymentStep, setShowPaymentStep] = useState(false);
    const [validationError, setValidationError] = useState('');

    if (cart.length === 0 && !isSuccess) {
        navigate('/cart');
        return null;
    }

    const validatePayment = () => {
        const { paymentMethod, accountNumber } = formData;
        
        if (paymentMethod === 'CBE') {
            if (!accountNumber.startsWith('1000') || accountNumber.length !== 13 || !/^\d+$/.test(accountNumber)) {
                return 'CBE account must start with 1000 and be 13 digits.';
            }
        } else if (paymentMethod === 'Abyssinia') {
            if (accountNumber.length !== 9 || !/^\d+$/.test(accountNumber)) {
                return 'Abyssinia account must be exactly 9 digits.';
            }
        } else if (paymentMethod === 'Telebirr') {
            if (!accountNumber.startsWith('+2519') || accountNumber.length !== 13) {
                return 'Telebirr must start with +2519 and be a valid Ethiopian number.';
            }
        }
        return '';
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        if (!formData.paymentMethod) {
            setValidationError('Please select a payment method.');
            return;
        }
        alert('Please pay first!');
        setShowPaymentStep(true);
        setValidationError('');
    };

    const handleFinalConfirm = () => {
        const error = validatePayment();
        if (error) {
            setValidationError(error);
            return;
        }

        const newOrder = {
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
            items: [...cart],
            total: cartTotal + 50,
            customer: formData,
            status: 'Paid - Pending Approval',
            isPaid: true
        };
        
        addOrder(newOrder);
        setIsSuccess(true);
        clearCart();

        setTimeout(() => {
            navigate('/orders');
        }, 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setValidationError('');
    };

    if (isSuccess) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center animate-fade-in px-4">
                <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 text-center max-w-md w-full">
                    <div className="mx-auto w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <CheckCircle2 size={48} className="animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-wide">Payment Successful!</h2>
                    <p className="text-slate-500 mb-8 text-lg">
                        Your order is confirmed and being prepared in the kitchen.
                    </p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-full animate-pulse-fast"></div>
                    </div>
                    <p className="text-sm font-medium text-slate-400 mt-4">Redirecting to order history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Checkout</h1>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
                    {showPaymentStep ? 'Secure Payment' : 'Delivery Information'}
                </h2>

                {!showPaymentStep ? (
                    <form onSubmit={handleInitialSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text" required name="name" value={formData.name} onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 focus:bg-white"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                <input
                                    type="tel" required name="phone" value={formData.phone} onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 focus:bg-white"
                                    placeholder="+251 911 234 567"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Address</label>
                            <textarea
                                required rows="3" name="address" value={formData.address} onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 focus:bg-white resize-none"
                                placeholder="House No, Street, City"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">Select Payment Method</label>
                            <select
                                name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 font-bold text-slate-800"
                            >
                                <option value="">Choose a bank...</option>
                                <option value="CBE">Commercial Bank of Ethiopia (CBE)</option>
                                <option value="Abyssinia">Bank of Abyssinia</option>
                                <option value="Telebirr">Telebirr</option>
                            </select>
                            {validationError && <p className="text-red-500 text-xs mt-2 font-bold">{validationError}</p>}
                        </div>

                        <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 flex justify-between items-center">
                            <span className="font-bold text-slate-900">Total Due</span>
                            <span className="text-brand-600 text-3xl font-extrabold">{cartTotal + 50} ETB</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-brand-700 transition-all"
                        >
                            Confirm Details & Proceed to Pay
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{formData.paymentMethod} Payment Simulation</h3>
                            <p className="text-sm text-slate-500 mb-6">Enter your account details to complete the transfer of <span className="text-brand-600 font-bold">{cartTotal + 50} ETB</span>.</p>
                            
                            <div className="max-w-xs mx-auto text-left space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Account Number / Phone</label>
                                    <input
                                        type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-mono text-lg"
                                        placeholder={formData.paymentMethod === 'CBE' ? '1000...' : formData.paymentMethod === 'Telebirr' ? '+2519...' : '9 digits'}
                                    />
                                    {validationError && <p className="text-red-500 text-[10px] mt-2 font-bold leading-tight">{validationError}</p>}
                                </div>
                                <button
                                    onClick={handleFinalConfirm}
                                    className="w-full py-3 bg-brand-600 text-white rounded-xl font-extrabold hover:bg-brand-700 transition-all shadow-lg"
                                >
                                    Pay Now
                                </button>
                                <button
                                    onClick={() => setShowPaymentStep(false)}
                                    className="w-full py-2 text-slate-400 text-sm font-bold hover:text-slate-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
