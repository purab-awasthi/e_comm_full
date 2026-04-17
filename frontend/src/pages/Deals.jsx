import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, Heart, Star, Timer, Flame } from 'lucide-react';

const Deals = () => {
  const [dealProducts, setDealProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      
      // SAFETY CHECK: Ensure we actually have an array before doing array operations
      // Sometimes APIs wrap responses in a 'data' object, e.g., res.data.products
      let productsArray = [];
      if (Array.isArray(res.data)) {
        productsArray = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        productsArray = res.data.data;
      } else if (res.data && Array.isArray(res.data.products)) {
        productsArray = res.data.products;
      }

      if (productsArray.length === 0) {
        setDealProducts([]);
        setLoading(false);
        return;
      }

      // MOCKING DEALS: Randomly selecting half the products and applying a fake discount
      const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 12).map(p => ({
        ...p,
        originalPrice: p.price * (1 + (Math.random() * 0.4 + 0.1)), // 10-50% higher original price
        rating: p.rating || (Math.random() * 2 + 3).toFixed(1),
        reviews: p.reviews || Math.floor(Math.random() * 500),
      }));
      
      setDealProducts(selected);
    } catch (err) {
      console.error("Failed to fetch deals:", err);
      setDealProducts([]);
    }
    setLoading(false);
  };

  const addToCart = async (productId) => {
    if (!user) return alert("Please login to add items to your cart.");

    try {
      await api.post(`/cart?productId=${productId}&quantity=1`);
      alert("Added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Could not add to cart.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      
      {/* Flash Sale Hero */}
      <div className="bg-red-50 rounded-2xl px-8 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between border border-red-100 relative overflow-hidden">
        <div className="relative z-10 w-full md:w-2/3 space-y-4">
          <div className="inline-flex items-center bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold mb-2">
            <Flame className="w-4 h-4 mr-1" /> Flash Sale Ending Soon
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-950 leading-tight">
            Epic Deals. <br className="hidden md:block" />Up to 50% Off.
          </h1>
          <p className="text-red-800 text-lg max-w-lg">
            Grab our top-rated electronics and home appliances at unbeatable prices before they're gone.
          </p>
        </div>
        
        {/* Mock Countdown Timer */}
        <div className="w-full md:w-1/3 flex justify-start md:justify-end mt-8 md:mt-0 relative z-10">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 border border-red-50">
            <Timer className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Offer ends in</p>
              <div className="text-2xl font-extrabold text-gray-900 tracking-tight">04h : 23m : 59s</div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-gray-900">Today's Best Offers</h2>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      ) : dealProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">No deals available right now.</h3>
          <p className="text-gray-500">Check back later for flash sales!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {dealProducts.map((p) => {
            const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
            
            return (
              <div key={p.id} className="group relative bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative bg-gray-50 rounded-xl aspect-square mb-5 flex items-center justify-center p-6 overflow-hidden">
                  
                  {/* Deal Badge */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full z-10 shadow-sm">
                    {discountPercent}% OFF
                  </div>

                  <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10 bg-white p-2 rounded-full shadow-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                  
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://picsum.photos/seed/${p.id}/800/800`;
                      }}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30 text-gray-400" />
                  )}
                </div>
                
                <div className="flex flex-col flex-grow px-1">
                  <h3 className="font-bold text-gray-900 text-base line-clamp-1 mb-1.5">{p.name}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-1">{p.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3 mt-auto">
                    <span className="font-extrabold text-red-600 text-lg">${p.price.toFixed(2)}</span>
                    <span className="text-sm font-medium text-gray-400 line-through">${p.originalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center space-x-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(p.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs font-medium text-gray-400 ml-1.5">({p.reviews})</span>
                  </div>
                  
                  <button onClick={() => addToCart(p.id)} className="w-full px-6 py-2 border-2 border-red-600 text-red-600 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Deals;