import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-16 max-w-4xl mt-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce">🍕</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            About FoodieDash
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4">Ethiopia's #1 Food Delivery Platform</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Our Story</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            FoodieDash was founded in 2024 with a simple vision: to make great food accessible to everyone, everywhere. 
            What started as a small idea has grown into Ethiopia's most trusted food delivery platform, connecting thousands 
            of food lovers with their favorite restaurants.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            We believe that good food brings people together. Whether you're craving traditional Ethiopian cuisine, 
            juicy burgers, or a cup of authentic coffee, FoodieDash delivers happiness right to your doorstep.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition">
            <div className="text-4xl mb-3">🏪</div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm opacity-90">Partner Restaurants</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition">
            <div className="text-4xl mb-3">😊</div>
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-sm opacity-90">Happy Customers</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition">
            <div className="text-4xl mb-3">⏱️</div>
            <div className="text-3xl font-bold">30min</div>
            <div className="text-sm opacity-90">Average Delivery</div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            To revolutionize the food delivery experience in Ethiopia by providing a seamless, reliable, and delightful platform 
            that connects people with their favorite meals, supporting local restaurants and creating memorable dining experiences at home.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <i className="fas fa-star text-orange-500 mt-1"></i>
              <div>
                <div className="font-semibold dark:text-white">Quality First</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">We only partner with the best restaurants</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <i className="fas fa-bolt text-orange-500 mt-1"></i>
              <div>
                <div className="font-semibold dark:text-white">Fast Delivery</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Quick and reliable service</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <i className="fas fa-smile text-orange-500 mt-1"></i>
              <div>
                <div className="font-semibold dark:text-white">Customer First</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Your satisfaction is our priority</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <i className="fas fa-shield-alt text-orange-500 mt-1"></i>
              <div>
                <div className="font-semibold dark:text-white">Safe & Secure</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Secure payments and handling</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/menu">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg">
              Explore Our Menu
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;