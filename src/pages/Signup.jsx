import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await signup(name, email, password);
    if (success) {
      navigate('/menu');
    } else {
      setError('Email already registered');
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍕</div>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold">Sign Up</button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link to="/login" className="text-orange-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;