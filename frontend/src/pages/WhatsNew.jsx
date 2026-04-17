import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, Heart, Star, Sparkles } from 'lucide-react';

const WhatsNew = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      // MOCKING NEW ARRIVALS: Reversing the array to simulate the newest items being first
      // In a real app: `/products?sort=createdAt_desc`
      const recent = [...res.data].reverse().slice(0, 16).map(p => ({
        ...p,
        rating: p.rating || (Math.random() * 2 + 3).toFixed(1),
        reviews: p.reviews || Math.floor(Math.random() * 100), // Newer products have fewer reviews
      }));
      setNewProducts(recent);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const addToCart = async (productId) => {
  if (!user) return alert("Please login to add items to your cart.");

  try {
    await api.post(`/cart?productId=${productId}&quantity=1`);
    alert("Added to cart!");
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      
      {/* Fresh Arrivals Hero */}
      <div className="bg-blue-50 rounded-2xl px-8 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between border border-blue-100 relative overflow-hidden">
        <div className="relative z-10 w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-2">
            <Sparkles className="w-4 h-4 mr-1.5" /> Spring Collection
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 leading-tight">
            Fresh out the box.
          </h1>
          <p className="text-blue-800 text-lg">
            Be the first to get your hands on our newest tech and latest innovations.
          </p>
        </div>
        
        {/* Decorative graphic */}
        <div className="hidden md:flex w-full md:w-1/2 justify-end items-center relative pl-8">
          <div className="w-64 h-64 bg-blue-200 rounded-full blur-3xl absolute opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1000&auto=format&fit=crop" 
            alt="New Smartphone" 
            className="h-64 lg:h-80 w-auto object-cover rounded-2xl shadow-2xl relative z-10 border-4 border-white"
          />
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-gray-900">Just Dropped</h2>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newProducts.map((p) => (
            <div key={p.id} className="group relative bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="relative bg-gray-50 rounded-xl aspect-square mb-5 flex items-center justify-center p-6 overflow-hidden">
                
                {/* NEW Badge */}
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md z-10 shadow-sm">
                  NEW
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
                <div className="flex justify-between items-start mb-1.5 gap-2">
                  <h3 className="font-bold text-gray-900 text-base line-clamp-1">{p.name}</h3>
                  <span className="font-extrabold text-gray-900 text-base shrink-0">${p.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3 line-clamp-1">{p.description}</p>
                
                <div className="flex items-center space-x-1 mb-5 mt-auto">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(p.rating) ? 'text-blue-500 fill-current' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-xs font-medium text-gray-400 ml-1.5">({p.reviews})</span>
                </div>
                
                <button onClick={() => addToCart(p.id)} className="w-max px-6 py-2 border border-gray-300 text-gray-800 rounded-full text-sm font-bold hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhatsNew;