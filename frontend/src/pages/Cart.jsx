import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchCart();
    else setLoading(false);
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
    setLoading(false);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      // Assuming your API has an endpoint to update cart quantity
      await api.put(`/cart/${itemId}`, { quantity: newQuantity });
      setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% dummy tax
  const total = subtotal + tax;

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div></div>;
  }

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-emerald-50 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-emerald-800" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover our latest products and find something you love!</p>
        <Link to="/" className="bg-emerald-800 text-white px-8 py-3.5 rounded-full font-bold hover:bg-emerald-900 transition-colors shadow-md flex items-center">
          Start Shopping <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 flex shrink-0">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://picsum.photos/seed/${item.product.id}/200/200`;
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-gray-900 text-lg">{item.product.name}</h3>
                <p className="text-sm text-gray-500">{item.product.category}</p>
                <div className="font-extrabold text-emerald-800 mt-2">${item.product.price.toFixed(2)}</div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-emerald-800 transition">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-emerald-800 transition">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-28">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-emerald-800">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-emerald-800 text-white py-4 rounded-full font-bold text-lg hover:bg-emerald-900 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;