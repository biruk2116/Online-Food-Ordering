import React from 'react';
import { Link } from 'react-router-dom';
import { useFood } from '../context/FoodContext';

const Home = () => {
  const { foods } = useFood();
  const featuredFoods = foods?.slice(0, 3) || [];

  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-6 animate-bounce">🍔</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            FoodieDash
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Delivering happiness to your doorstep. Fresh, fast, and delicious!
          </p>
          <Link to="/menu">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg text-lg">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="min-h-screen flex items-center bg-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: '30-minute delivery or free' },
              { icon: '🍽️', title: 'Quality Food', desc: 'Prepared with fresh ingredients' },
              { icon: '💳', title: 'Easy Payment', desc: 'Multiple payment options' }
            ].map(feature => (
              <div key={feature.title} className="text-center p-6 rounded-2xl hover:shadow-xl transition transform hover:scale-105">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Foods Section */}
      <div className="min-h-screen flex items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Dishes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredFoods.map(food => (
              <Link to={`/food/${food.id}`} key={food.id} className="text-center group">
                <img src={food.image} alt={food.name} className="w-48 h-48 object-cover rounded-full mx-auto mb-4 group-hover:scale-110 transition shadow-lg" />
                <h3 className="text-xl font-bold">{food.name}</h3>
                <p className="text-orange-500 font-bold mt-2">${food.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;