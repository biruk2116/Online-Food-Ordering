import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFood, useCart, useAuth } from '../App';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { foods } = useFood();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  
  const food = foods.find(f => f.id === parseInt(id));

  const styles = {
    container: { maxWidth: 1024, margin: '0 auto', padding: '32px 16px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 },
    image: { width: '100%', borderRadius: 24, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
    price: { fontSize: 36, fontWeight: 'bold', color: '#f97316', margin: '16px 0' },
    nutritionGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, margin: '24px 0', padding: 20, background: '#f9fafb', borderRadius: 16 },
    addBtn: { flex: 1, padding: '14px', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' }
  };

  if (!food) return <div style={{ textAlign: 'center', padding: 80 }}>Food not found</div>;

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login first!');
      navigate('/login');
      return;
    }
    addToCart(food, quantity);
    navigate('/cart');
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#f97316', cursor: 'pointer', marginBottom: 24 }}>← Back</button>
      
      <div style={styles.grid}>
        <img src={food.image} alt={food.name} style={styles.image} />
        
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 8 }}>{food.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ color: '#fbbf24', fontSize: 20 }}>★</span>
            <span>{food.rating}</span>
          </div>
          <p style={{ color: '#4b5563', lineHeight: 1.6 }}>{food.description}</p>
          
          <div style={styles.nutritionGrid}>
            <div><div style={{ fontSize: 24 }}>🔥</div><div style={{ fontWeight: 'bold' }}>{food.calories}</div><div style={{ fontSize: 12, color: '#6b7280' }}>Calories</div></div>
            <div><div style={{ fontSize: 24 }}>🍞</div><div style={{ fontWeight: 'bold' }}>{food.carbs}g</div><div style={{ fontSize: 12, color: '#6b7280' }}>Carbs</div></div>
            <div><div style={{ fontSize: 24 }}>💪</div><div style={{ fontWeight: 'bold' }}>{food.protein}g</div><div style={{ fontSize: 12, color: '#6b7280' }}>Protein</div></div>
            <div><div style={{ fontSize: 24 }}>🧈</div><div style={{ fontWeight: 'bold' }}>{food.fats}g</div><div style={{ fontSize: 12, color: '#6b7280' }}>Fats</div></div>
          </div>
          
          <div style={styles.price}>${food.price}</div>
          
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: '#e5e7eb', cursor: 'pointer', fontSize: 20 }}>-</button>
              <span style={{ fontSize: 20, minWidth: 40, textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: '#e5e7eb', cursor: 'pointer', fontSize: 20 }}>+</button>
            </div>
            <button onClick={handleAddToCart} style={styles.addBtn}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;