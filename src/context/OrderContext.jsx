import { createContext, useState, useEffect } from 'react';
import { getStoredOrders, saveStoredOrder } from '../utils/localStorage';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const stored = getStoredOrders();
        setOrders(stored);
    }, []);

    const addOrder = (order) => {
        saveStoredOrder(order);
        setOrders(getStoredOrders()); // Refresh from local storage
    };

    const updateOrderStatus = (orderId, status, isPaid = false) => {
        const stored = getStoredOrders();
        const updated = stored.map(o => o.id === orderId ? { ...o, status, isPaid: isPaid || o.isPaid } : o);
        localStorage.setItem('orders', JSON.stringify(updated));
        setOrders(updated);
    };

    const approveOrder = (orderId) => {
        const stored = getStoredOrders();
        const updated = stored.map(o => o.id === orderId ? { ...o, status: 'Approved' } : o);
        localStorage.setItem('orders', JSON.stringify(updated));
        setOrders(updated);
    };

    const clearApprovedOrders = () => {
        const stored = getStoredOrders();
        const updated = stored.filter(o => o.status !== 'Approved');
        localStorage.setItem('orders', JSON.stringify(updated));
        setOrders(updated);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, approveOrder, clearApprovedOrders }}>
            {children}
        </OrderContext.Provider>
    );
};
