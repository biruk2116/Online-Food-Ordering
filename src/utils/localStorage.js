export const getStoredFoods = (defaultData) => {
    const stored = localStorage.getItem('foods');
    return stored ? JSON.parse(stored) : defaultData;
};

export const saveStoredFoods = (foods) => {
    localStorage.setItem('foods', JSON.stringify(foods));
};

export const getStoredOrders = () => {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
};

export const saveStoredOrder = (order) => {
    const orders = getStoredOrders();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
};

export const getStoredUser = () => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
};

export const saveStoredUser = (user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
};
