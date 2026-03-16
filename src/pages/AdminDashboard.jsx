import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FoodContext } from '../context/FoodContext';
import { OrderContext } from '../context/OrderContext';
import { SettingsContext } from '../context/SettingsContext';
import AdminFoodForm from '../components/AdminFoodForm';
import AdminFoodTable from '../components/AdminFoodTable';
import { Settings, LogOut, PlusCircle, Image as ImageIcon, ShoppingBag } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { foods, addFood, updateFood, deleteFood } = useContext(FoodContext);
    const { backgroundImage, updateBackgroundImage } = useContext(SettingsContext);
    const { orders, approveOrder, clearApprovedOrders, updateOrderStatus } = useContext(OrderContext);
    
    const [editingFood, setEditingFood] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [bgInput, setBgInput] = useState(backgroundImage || '');

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    const handleCreateOrUpdate = (foodData) => {
        if (editingFood) {
            updateFood(editingFood.id, foodData);
            setEditingFood(null);
        } else {
            addFood(foodData);
        }
        setIsFormVisible(false);
    };

    const handleEdit = (food) => {
        setEditingFood(food);
        setIsFormVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-8 animate-fade-in relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center tracking-tight">
                            <Settings className="mr-3 text-brand-500" size={32} />
                            Admin Portal
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Manage your restaurant menu, prices, and categories.</p>
                    </div>
                    <div className="mt-6 sm:mt-0 flex items-center space-x-4">
                        <button
                            onClick={() => { setEditingFood(null); setIsFormVisible(!isFormVisible); }}
                            className={`flex items-center px-5 py-2.5 rounded-xl transition-all font-semibold shadow-sm hover:shadow-md ${isFormVisible && !editingFood
                                    ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10'
                                }`}
                        >
                            <PlusCircle size={18} className="mr-2" />
                            {isFormVisible && !editingFood ? 'Cancel Adding' : 'Add New Item'}
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold border border-red-100 shadow-sm"
                        >
                            <LogOut size={16} className="mr-2" />
                            Sign Out
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-grow">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center mb-2">
                                <ImageIcon className="mr-2 text-brand-500" size={24} />
                                App Settings
                            </h2>
                            <p className="text-sm text-slate-500 mb-4">Set a dynamic background image for the application.</p>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={bgInput}
                                    onChange={(e) => setBgInput(e.target.value)}
                                    placeholder="Enter image URL or /assets/images/bg.jpg"
                                    className="flex-grow px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none placeholder-slate-300"
                                />
                                <button
                                    onClick={() => updateBackgroundImage(bgInput)}
                                    className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                                >
                                    Save Background
                                </button>
                                {backgroundImage && (
                                    <button
                                        onClick={() => { setBgInput(''); updateBackgroundImage(''); }}
                                        className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors whitespace-nowrap"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {isFormVisible && (
                    <div className="mb-10 animate-fade-in origin-top transition-all">
                        <AdminFoodForm
                            onSubmit={handleCreateOrUpdate}
                            initialData={editingFood}
                            onCancel={() => { setIsFormVisible(false); setEditingFood(null); }}
                        />
                    </div>
                )}

                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Menu Inventory</h2>
                        <span className="bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-sm font-bold border border-brand-100 shadow-sm">
                            Total items: {foods.length}
                        </span>
                    </div>
                    <AdminFoodTable foods={foods} onEdit={handleEdit} onDelete={deleteFood} />
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                            <ShoppingBag className="mr-3 text-brand-500" size={28} />
                            Customer Orders
                        </h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={clearApprovedOrders}
                                className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors border border-slate-200 shadow-sm"
                            >
                                Clear Approved Orders
                            </button>
                            <span className="bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-sm font-bold border border-brand-100 shadow-sm">
                                Total orders: {orders.length}
                            </span>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <ShoppingBag size={48} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium text-lg">No orders placed yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID / Date</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Items Ordered</th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Payment / Total</th>
                                        <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-slate-900">{order.id}</div>
                                                <div className="text-xs text-slate-500 mt-1">{new Date(order.date).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800">{order.customer.name}</div>
                                                <div className="text-xs text-slate-500 mt-1">{order.customer.phone}</div>
                                                <div className="text-xs text-slate-400 mt-1 truncate max-w-[150px]">{order.customer.address}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 max-w-[200px]">
                                                    {order.items.map((item, idx) => (
                                                        <span key={idx} className="text-sm text-slate-700 truncate">
                                                            • {item.quantity}x {item.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                <div className="font-semibold text-brand-600 block text-lg">{order.total} ETB</div>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                                    {order.customer.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${
                                                        order.status === 'Kitchen paid & Delivered' 
                                                        ? 'bg-green-100 text-green-800 border-green-200' 
                                                        : order.isPaid
                                                        ? 'bg-brand-50 text-brand-700 border-brand-200 animate-pulse'
                                                        : 'bg-red-50 text-red-700 border-red-200'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                    {order.status !== 'Kitchen paid & Delivered' && (
                                                        <button 
                                                            onClick={() => {
                                                                if (!order.isPaid) {
                                                                    alert('USER NOT PAID! This order cannot be processed until payment is confirmed.');
                                                                } else {
                                                                    updateOrderStatus(order.id, 'Kitchen paid & Delivered');
                                                                }
                                                            }}
                                                            className={`mt-2 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                                                                order.isPaid 
                                                                ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/20' 
                                                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                            }`}
                                                        >
                                                            {order.isPaid ? 'Approve & Send to Kitchen' : 'Awaiting Payment'}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
