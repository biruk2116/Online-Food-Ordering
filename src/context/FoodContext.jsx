// Add these functions to your App.jsx FoodContext
const addCategory = (category) => {
  const newCategory = { ...category, id: Date.now() };
  const updated = [...categories, newCategory];
  setCategories(updated);
  localStorage.setItem('categories', JSON.stringify(updated));
  showNotification('Category added successfully!');
  return newCategory;
};

const updateCategory = (id, updatedCategory) => {
  const updated = categories.map(cat => cat.id === id ? { ...cat, ...updatedCategory } : cat);
  setCategories(updated);
  localStorage.setItem('categories', JSON.stringify(updated));
  showNotification('Category updated successfully!');
};

const deleteCategory = (id) => {
  const updated = categories.filter(cat => cat.id !== id);
  setCategories(updated);
  localStorage.setItem('categories', JSON.stringify(updated));
  showNotification('Category deleted successfully!');
};