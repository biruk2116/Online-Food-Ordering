// src/pages/Home.jsx (New - Full Screen Sections with Scroll Snap)
import React from 'react';
import { Link } from 'react-router-dom';
import { useFood } from '../context/FoodContext';

const Home = () => {
  const { foods } = useFood();
  const featuredFoods = foods.slice(0, 3);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Hero Section */}
      <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-bounce text-6xl mb-6">🍔</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            FoodieDash
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Delivering happiness to your doorstep. Fresh, fast, and delicious!
          </p>
          <Link to="/menu">
            <button className="btn-primary text-lg px-8 py-3 animate-pulse">
              Order Now
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="h-screen snap-start flex items-center bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: '30-minute delivery or free' },
              { icon: '🍽️', title: 'Quality Food', desc: 'Prepared with fresh ingredients' },
              { icon: '💳', title: 'Easy Payment', desc: 'Multiple payment options' }
            ].map(feature => (
              <div key={feature.title} className="text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="h-screen snap-start flex items-center bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Featured Dishes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredFoods.map(food => (
              <div key={food.id} className="text-center group cursor-pointer" onClick={() => window.location.href = `/food/${food.id}`}>
                <img src={food.image} alt={food.name} className="w-48 h-48 object-cover rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg" />
                <h3 className="text-xl font-bold">{food.name}</h3>
                <p className="text-orange-500 font-bold mt-2">${food.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;