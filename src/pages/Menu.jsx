import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFood, useCart, useAuth } from '../App';

const Menu = () => {
  const { foods, categories } = useFood();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [addingId, setAddingId] = useState(null);

  const filteredFoods = foods.filter(food => {
    const matchCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleAddToCart = async (food) => {
    if (!user) {
      alert('Please login first!');
      return;
    }
    setAddingId(food.id);
    await addToCart(food);
    setTimeout(() => setAddingId(null), 500);
  };

  const styles = {
    container: { maxWidth: 1280, margin: '0 auto', padding: '32px 16px' },
    searchInput: { width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: 12, marginBottom: 24, fontSize: 16 },
    categoryBtn: (active) => ({
      padding: '8px 20px',
      borderRadius: 9999,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'all 0.3s',
      background: active ? 'linear-gradient(135deg, #f97316, #ef4444)' : '#e5e7eb',
      color: active ? 'white' : '#374151'
    }),
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, marginTop: 32 },
    card: { background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s' },
    cardHover: { transform: 'translateY(-4px)' },
    image: { width: '100%', height: 200, objectFit: 'cover' },
    cardContent: { padding: 16 },
    price: { color: '#f97316', fontWeight: 'bold', fontSize: 18, marginTop: 8 },
    addBtn: (adding) => ({
      width: '100%',
      marginTop: 12,
      padding: '10px',
      borderRadius: 9999,
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      background: adding ? '#9ca3af' : 'linear-gradient(135deg, #f97316, #ef4444)',
      color: 'white',
      transition: 'transform 0.3s'
    })
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search for delicious food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            style={styles.categoryBtn(selectedCategory === cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      
      <div style={styles.grid}>
        {filteredFoods.map(food => (
          <div key={food.id} style={styles.card}>
            <Link to={`/food/${food.id}`}>
              <img src={food.image} alt={food.name} style={styles.image} />
            </Link>
            <div style={styles.cardContent}>
              <Link to={`/food/${food.id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#1f2937' }}>{food.name}</h3>
              </Link>
              <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 8 }}>{food.shortDescription}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#fbbf24' }}>★</span>
                <span style={{ fontSize: 14, color: '#4b5563' }}>{food.rating}</span>
              </div>
              <div style={styles.price}>${food.price}</div>
              <button
                onClick={() => handleAddToCart(food)}
                style={styles.addBtn(addingId === food.id)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {addingId === food.id ? '✓ Added!' : '🛒 Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;