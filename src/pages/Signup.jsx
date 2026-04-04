// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fadeIn">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍕</div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h2>
          <p className="text-gray-500 mt-2">Join FoodieDash today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="input" required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input" required />
          <button type="submit" className="btn-primary w-full py-3">Sign Up</button>
        </form>
        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-orange-500 hover:text-orange-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;