import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const AdminFoodTable = ({ foods, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm font-medium tracking-wide">
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {foods.map((food) => (
                            <tr key={food.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm">
                                        <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-slate-800">{food.name}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-semibold tracking-wide border border-slate-200/60">
                                        {food.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-brand-600 font-bold">{food.price} ETB</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(food)}
                                            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                            title="Edit Item"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(food.id)}
                                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                            title="Delete Item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {foods.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-8 py-12 text-center text-slate-400 bg-slate-50/30">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                            <Edit2 size={24} />
                                        </div>
                                        <p className="font-medium">No food items found.</p>
                                        <p className="text-sm mt-1">Use the form above to add your first menu item.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminFoodTable;
