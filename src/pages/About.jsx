import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4 animate-bounce">🍕</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          About FoodieDash
        </h1>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <p className="text-lg text-gray-600">
          FoodieDash is Ethiopia's premier online food delivery platform, connecting food lovers with the best restaurants in the country. 
          Founded in 2024, we've been on a mission to make delicious food accessible to everyone, anytime, anywhere.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 my-8">
          {[
            { number: '500+', label: 'Partner Restaurants' },
            { number: '50K+', label: 'Happy Customers' },
            { number: '30min', label: 'Average Delivery' }
          ].map(stat => (
            <div key={stat.label} className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-500">{stat.number}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mt-8">Our Mission</h2>
        <p className="text-gray-600">
          To revolutionize the food delivery experience in Ethiopia by providing a seamless, reliable, and delightful platform 
          that connects people with their favorite meals.
        </p>
      </div>
    </div>
  );
};

export default About;