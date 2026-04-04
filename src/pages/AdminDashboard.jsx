import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useFood } from '../App';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { foods, addFood, deleteFood } = useFood();
  const [newFood, setNewFood] = useState({ name: '', price: '', category: 'Burger', image: '' });

  const styles = {
    container: { maxWidth: 1280, margin: '0 auto', padding: '32px 16px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32 },
    card: { background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    input: { width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 16, fontSize: 16 },
    button: { padding: '10px 20px', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px', borderBottom: '1px solid #e5e7eb' }
  };

  if (!user || user.email !== 'admin@foodie.com') {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addFood({ ...newFood, price: parseFloat(newFood.price), rating: 4.5, shortDescription: 'Delicious food', description: 'Amazing taste', calories: 500, carbs: 50, protein: 30, fats: 20 });
    setNewFood({ name: '', price: '', category: 'Burger', image: '' });
  };

  return (
    <div style={styles.container}>
      <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 32 }}>Admin Dashboard</h1>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Add New Food</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Food Name" value={newFood.name} onChange={e => setNewFood({...newFood, name: e.target.value})} style={styles.input} required />
            <input type="number" placeholder="Price" value={newFood.price} onChange={e => setNewFood({...newFood, price: e.target.value})} style={styles.input} required />
            <select value={newFood.category} onChange={e => setNewFood({...newFood, category: e.target.value})} style={styles.input}>
              <option>Burger</option><option>Ethiopian</option><option>Beverage</option>
            </select>
            <input type="text" placeholder="Image URL" value={newFood.image} onChange={e => setNewFood({...newFood, image: e.target.value})} style={styles.input} required />
            <button type="submit" style={styles.button}>Add Food</button>
          </form>
        </div>
        
        <div style={styles.card}>
          <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Food List</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Price</th><th style={styles.th}>Category</th><th style={styles.th}>Action</th></tr></thead>
              <tbody>
                {foods.map(food => (
                  <tr key={food.id}><td style={styles.td}>{food.name}</td><td style={styles.td}>${food.price}</td><td style={styles.td}>{food.category}</td><td style={styles.td}><button onClick={() => deleteFood(food.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;