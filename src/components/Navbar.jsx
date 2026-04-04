import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useAuth, useSettings } from '../App';

const Navbar = () => {
  const { getItemCount } = useCart();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useSettings();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const styles = {
    navbar: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: isDark ? '#1f2937' : 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '12px 0'
    },
    container: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    logo: {
      fontSize: 24,
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #f97316, #ef4444)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textDecoration: 'none'
    },
    link: {
      color: isDark ? '#f3f4f6' : '#374151',
      textDecoration: 'none',
      transition: 'color 0.3s'
    },
    cartIcon: {
      position: 'relative',
      cursor: 'pointer',
      fontSize: 24
    },
    cartBadge: {
      position: 'absolute',
      top: -8,
      right: -12,
      background: '#f97316',
      color: 'white',
      borderRadius: '50%',
      width: 20,
      height: 20,
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>FoodieDash</Link>
        
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/menu" style={styles.link}>Menu</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          
          <button onClick={() => setIsDark(!isDark)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>
            {isDark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenu(!showMenu)} style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', padding: '8px 16px', borderRadius: 9999, border: 'none', cursor: 'pointer' }}>
                👤 {user.name.split(' ')[0]}
              </button>
              {showMenu && (
                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 8, background: 'white', borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: 8, minWidth: 150, zIndex: 50 }}>
                  <Link to="/orders" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: '#374151' }}>My Orders</Link>
                  {user.email === 'admin@foodie.com' && (
                    <Link to="/admin" style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: '#374151' }}>Admin</Link>
                  )}
                  <button onClick={handleLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white', padding: '8px 16px', borderRadius: 9999, textDecoration: 'none' }}>Login</Link>
          )}
          
          <Link to="/cart" style={styles.cartIcon}>
            🛒
            {getItemCount() > 0 && <span style={styles.cartBadge}>{getItemCount()}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;