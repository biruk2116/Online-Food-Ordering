// Backend API Service - Ready for Firebase, PHP, or any REST API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  // Authentication
  async login(email, password) {
    // For backend: return fetch(`${API_BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) });
    return { success: true, user: { id: 1, name: 'User', email } };
  }

  async signup(name, email, password) {
    // For backend: return fetch(`${API_BASE_URL}/auth/signup`, { method: 'POST', body: JSON.stringify({ name, email, password }) });
    return { success: true, user: { id: Date.now(), name, email } };
  }

  // Food Operations
  async getFoods() {
    // For backend: return fetch(`${API_BASE_URL}/foods`).then(res => res.json());
    return JSON.parse(localStorage.getItem('foods') || '[]');
  }

  async addFood(foodData) {
    // For backend: return fetch(`${API_BASE_URL}/foods`, { method: 'POST', body: JSON.stringify(foodData) });
    const foods = JSON.parse(localStorage.getItem('foods') || '[]');
    const newFood = { ...foodData, id: Date.now() };
    foods.push(newFood);
    localStorage.setItem('foods', JSON.stringify(foods));
    return newFood;
  }

  async updateFood(id, foodData) {
    // For backend: return fetch(`${API_BASE_URL}/foods/${id}`, { method: 'PUT', body: JSON.stringify(foodData) });
    const foods = JSON.parse(localStorage.getItem('foods') || '[]');
    const index = foods.findIndex(f => f.id === id);
    if (index !== -1) foods[index] = { ...foods[index], ...foodData };
    localStorage.setItem('foods', JSON.stringify(foods));
    return foods[index];
  }

  async deleteFood(id) {
    // For backend: return fetch(`${API_BASE_URL}/foods/${id}`, { method: 'DELETE' });
    const foods = JSON.parse(localStorage.getItem('foods') || '[]');
    const filtered = foods.filter(f => f.id !== id);
    localStorage.setItem('foods', JSON.stringify(filtered));
    return { success: true };
  }

  // Category Operations
  async getCategories() {
    return JSON.parse(localStorage.getItem('categories') || '[]');
  }

  async addCategory(categoryData) {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const newCategory = { ...categoryData, id: Date.now() };
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    return newCategory;
  }

  async updateCategory(id, categoryData) {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) categories[index] = { ...categories[index], ...categoryData };
    localStorage.setItem('categories', JSON.stringify(categories));
    return categories[index];
  }

  async deleteCategory(id) {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const filtered = categories.filter(c => c.id !== id);
    localStorage.setItem('categories', JSON.stringify(filtered));
    return { success: true };
  }

  // Order Operations
  async placeOrder(orderData) {
    // For backend: return fetch(`${API_BASE_URL}/orders`, { method: 'POST', body: JSON.stringify(orderData) });
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = { ...orderData, id: Date.now(), orderNumber: `ORD-${Date.now()}`, date: new Date().toISOString(), status: 'Pending' };
    orders.unshift(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  }

  async getOrders(userId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return userId ? orders.filter(o => o.userId === userId) : orders;
  }

  async updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) orders[index].status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
    return orders[index];
  }

  // Payment Processing
  async processPayment(paymentData) {
    // For backend: return fetch(`${API_BASE_URL}/payment/process`, { method: 'POST', body: JSON.stringify(paymentData) });
    return {
      success: true,
      transactionId: `TXN_${Date.now()}`,
      message: 'Payment processed successfully'
    };
  }
}

export default new ApiService();