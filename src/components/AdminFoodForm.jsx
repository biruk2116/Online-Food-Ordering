import React, { useState, useEffect } from 'react';

const AdminFoodForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Traditional',
        description: '',
        image: '',
        calories: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: Number(formData.price),
            calories: Number(formData.calories) || 0
        });
        if (!initialData) {
            setFormData({ name: '', price: '', category: 'Traditional', description: '', image: '', calories: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 transition-all hover:shadow-md">
            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
                {initialData ? 'Edit Food Item' : 'Add New Food Item'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                    <input
                        type="text" required name="name" value={formData.name} onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-300"
                        placeholder="e.g. Doro Wat"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Price (ETB)</label>
                    <input
                        type="number" required min="0" name="price" value={formData.price} onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                        placeholder="e.g. 250"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                    <select
                        name="category" value={formData.category} onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
                    >
                        <option value="Traditional">Traditional</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Traditional Drinks">Traditional Drinks</option>
                        <option value="Modern Drinks">Modern Drinks</option>
                        <option value="Other Drinks">Other Drinks</option>
                        <option value="Desserts">Desserts</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Calories (kcal)</label>
                    <input
                        type="number" min="0" name="calories" value={formData.calories} onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                        placeholder="e.g. 450"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">Full Description</label>
                    <textarea
                        required rows="4" name="description" value={formData.description} onChange={handleChange}
                        className="w-full px-5 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all resize-none shadow-sm placeholder-slate-300 text-slate-600 font-medium"
                        placeholder="Describe the flavors, ingredients, and soul of this dish..."
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Image Path</label>
                    <input
                        type="text" required name="image" value={formData.image} onChange={handleChange}
                        placeholder="/assets/images/dorowat.png"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-600"
                    />
                    <p className="text-xs text-slate-500 mt-2">Save your image in the <code>public/assets/images</code> folder and reference it like <code>/assets/images/filename.jpg</code></p>
                    {formData.image && (
                        <div className="mt-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                            <p className="text-sm text-slate-500 font-medium mb-3">Live Preview:</p>
                            <img
                                src={formData.image}
                                alt="Preview"
                                className="h-40 w-full md:w-64 rounded-lg object-cover border border-slate-200 shadow-sm"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'block';
                                }}
                                onLoad={(e) => {
                                    e.target.style.display = 'block';
                                    e.target.nextElementSibling.style.display = 'none';
                                }}
                            />
                            <div className="hidden text-sm text-amber-600 font-medium p-3 bg-amber-50 rounded border border-amber-200">
                                Image not found or loading! Please check if the file exists at <code>public{formData.image}</code>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all shadow-sm hover:shadow-md font-medium"
                >
                    {initialData ? 'Update Food Item' : 'Add Menu Item'}
                </button>
            </div>
        </form>
    );
};

export default AdminFoodForm;
