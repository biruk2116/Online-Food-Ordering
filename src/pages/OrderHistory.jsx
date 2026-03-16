import React, { useState, useEffect, useContext } from 'react';
import { getStoredOrders } from '../utils/localStorage';
import { AuthContext } from '../context/AuthContext';
import { Clock, CheckCircle2, Package } from 'lucide-react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setOrders(getStoredOrders().reverse());
    }, []);

    if (!user) {
        return (
            <div className="text-center py-20 px-4">
                <h2 className="text-2xl font-bold text-slate-800">Please login to view your orders.</h2>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                        <Package size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">No past orders</h2>
                    <p className="text-slate-500">You haven't placed any orders yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight flex items-center">
                <Clock className="mr-3 text-brand-500" size={32} />
                Order History
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-500 font-medium mb-1">Order ID: <span className="font-bold text-slate-800">{order.id}</span></p>
                                <p className="text-xs font-medium text-slate-400">
                                    {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center border ${
                                    order.status === 'Kitchen paid & Delivered' 
                                    ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                    : order.status === 'Kitchen process' 
                                    ? 'bg-orange-100 text-orange-700 border-orange-200'
                                    : 'bg-green-100 text-green-700 border-green-200'
                                }`}>
                                    {order.status === 'Kitchen paid & Delivered' && <CheckCircle2 size={14} className="mr-1" />}
                                    {order.status}
                                </span>
                                <span className="font-extrabold text-lg text-brand-600">{order.total} ETB</span>
                            </div>
                        </div>

                        {order.status === 'Kitchen paid & Delivered' && (
                            <div className="bg-blue-50 px-6 py-2 border-b border-blue-100">
                                <p className="text-xs font-bold text-blue-600 flex items-center">
                                    <CheckCircle2 size={12} className="mr-1" />
                                    Notification: Payment confirmed! Your food has been delivered. Thank you!
                                </p>
                            </div>
                        )}

                        <div className="p-6">
                            <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">Items</h4>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md shadow-sm hidden sm:block mr-4" />
                                            <div>
                                                <span className="font-semibold text-slate-800">{item.name}</span>
                                                <div className="text-xs text-slate-500 font-medium mt-0.5">Quantity: <span className="text-slate-700 font-semibold">{item.quantity}</span></div>
                                            </div>
                                        </div>
                                        <span className="font-bold text-slate-700 shrink-0">{item.price * item.quantity} ETB</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
