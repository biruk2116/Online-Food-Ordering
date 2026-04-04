import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFood, useCart, useAuth } from '../App';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { foods } = useFood();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  
  const food = foods.find(f => f.id === parseInt(id));

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`) || '[]');
    setReviews(savedReviews);
  }, [id]);

  if (!food) {
    return <div className="container mx-auto px-4 py-16 text-center">Food not found</div>;
  }

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login first!');
      navigate('/login');
      return;
    }
    addToCart(food, quantity);
    navigate('/cart');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      return;
    }
    const review = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    };
    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReview({ rating: 5, comment: '' });
    alert('Review submitted successfully!');
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : food.rating;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      <button onClick={() => navigate(-1)} className="mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-2">
        <i className="fas fa-arrow-left"></i> Back
      </button>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-2xl opacity-20"></div>
          <img src={food.image} alt={food.name} className="w-full h-96 object-cover rounded-2xl shadow-2xl relative z-10" />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{food.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="font-semibold">{averageRating}</span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fas fa-tag text-orange-500"></i>
              <span className="text-gray-600 dark:text-gray-300">{food.category}</span>
            </div>
          </div>
          
          <div className="text-4xl font-bold text-orange-500 mb-6">${food.price}</div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-xl font-bold hover:scale-110 transition">-</button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-xl font-bold hover:scale-110 transition">+</button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition shadow-lg">
              <i className="fas fa-cart-plus mr-2"></i> Add to Cart
            </button>
          </div>
          
          {/* Tabs */}
          <div className="border-b dark:border-gray-700 mb-6">
            <div className="flex gap-6">
              {['description', 'nutrition', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 capitalize font-semibold transition relative ${
                    activeTab === tab ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{food.description}</p>
            )}
            
            {activeTab === 'nutrition' && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Nutritional Information (per serving)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <span><i className="fas fa-fire text-orange-500 mr-2"></i>Calories</span>
                    <span className="font-bold">{food.nutrition.calories} kcal</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <span><i className="fas fa-bread-slice text-yellow-500 mr-2"></i>Carbohydrates</span>
                    <span className="font-bold">{food.nutrition.carbs}g</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <span><i className="fas fa-dumbbell text-blue-500 mr-2"></i>Protein</span>
                    <span className="font-bold">{food.nutrition.protein}g</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <span><i className="fas fa-oil-can text-red-500 mr-2"></i>Fats</span>
                    <span className="font-bold">{food.nutrition.fats}g</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                {user && (
                  <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                    <h3 className="font-bold mb-3">Write a Review</h3>
                    <div className="mb-3">
                      <label className="block text-sm mb-1">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className={`text-2xl transition-transform hover:scale-110 ${
                              star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      rows="3"
                      placeholder="Share your experience..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 mb-3"
                      required
                    ></textarea>
                    <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition">
                      Submit Review
                    </button>
                  </form>
                )}
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                  ) : (
                    reviews.map(review => (
                      <div key={review.id} className="border-b dark:border-gray-700 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-semibold">{review.userName}</span>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;