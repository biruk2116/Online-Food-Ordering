import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useSettings } from '../App';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const { signup } = useAuth();
  const { isDark } = useSettings();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Email already registered');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 transition-all duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🍕</div>
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Create Account
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join FoodieDash today
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group">
            <input
              type="text"
              id="name"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full"
            />
            <label htmlFor="name">Full Name</label>
          </div>
          
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full"
            />
            <label htmlFor="email">Email Address</label>
          </div>
          
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full"
            />
            <label htmlFor="password">Password</label>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full btn-premium py-3 text-lg"
          >
            <i className="fas fa-user-plus mr-2"></i>
            Sign Up
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;