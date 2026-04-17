import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, Heart, Star, ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const FILTER_CATEGORIES = {
  'Headphone Type': ['Over-ear', 'In-ear', 'Earbuds', 'Bone Conduction'],
  'Price': ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'],
  'Review': ['4+ Stars', '3+ Stars'],
  'Color': ['Black', 'White', 'Blue', 'Red', 'Pink'],
};

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating_desc' }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  
  // --- NEW: Read the URL parameters ---
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';

  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('recommended');
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetching all products once, we will filter them in the browser for speed
      const res = await api.get('/products');
      
      const enhancedProducts = res.data.map(p => ({
        ...p,
        rating: p.rating || (Math.random() * 2 + 3).toFixed(1),
        reviews: p.reviews || Math.floor(Math.random() * 500),
      }));
      setProducts(enhancedProducts);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // --- THE FILTERING ENGINE (Now with URL support) ---
  const displayedProducts = useMemo(() => {
    let result = [...products];

    // 1. URL Search Filter
    if (urlSearch) {
      const query = urlSearch.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query))
      );
    }

    // 2. URL Category Filter
    if (urlCategory) {
      // The DB has categories like 'Audio', 'Electronics', 'Gaming', 'Home Appliances'
      result = result.filter(p => p.category && p.category.includes(urlCategory));
    }

    // 3. UI Dropdown Filters
    Object.keys(activeFilters).forEach(category => {
      const selectedValue = activeFilters[category];
      if (!selectedValue) return;

      if (category === 'Price') {
        if (selectedValue === 'Under $50') result = result.filter(p => p.price < 50);
        if (selectedValue === '$50 - $100') result = result.filter(p => p.price >= 50 && p.price <= 100);
        if (selectedValue === '$100 - $200') result = result.filter(p => p.price > 100 && p.price <= 200);
        if (selectedValue === 'Over $200') result = result.filter(p => p.price > 200);
      }
      if (category === 'Review') {
        if (selectedValue === '4+ Stars') result = result.filter(p => p.rating >= 4);
        if (selectedValue === '3+ Stars') result = result.filter(p => p.rating >= 3);
      }
    });

    // 4. Sorting
    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating_desc': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [products, activeFilters, sortBy, urlSearch, urlCategory]);

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[category] === value) delete newFilters[category];
      else newFilters[category] = value;
      return newFilters;
    });
    setOpenDropdown(null);
  };

  const addToCart = async (productId) => {
  if (!user) {
    alert("Please login to add items to your cart.");
    return;
  }

  try {
    await api.post(`/cart?productId=${productId}&quantity=1`);
    alert("Added to cart!");
  } catch (err) {
    console.error(err);
  }
};
  // The rest of the UI remains identical to the previous version
  return (
    <div className="container mx-auto px-4 py-8 space-y-12" ref={dropdownRef}>
      
      {/* If the user is actively searching/filtering via Nav, show a dynamic header instead of the Hero */}
      {urlSearch || urlCategory ? (
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
          <h1 className="text-3xl font-extrabold text-emerald-900">
            {urlSearch ? `Search Results for "${urlSearch}"` : `${urlCategory} Collection`}
          </h1>
          <p className="text-emerald-700 mt-2">Found {displayedProducts.length} items</p>
        </div>
      ) : (
        <div className="bg-[#fcf0e4] rounded-2xl px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="relative z-10 w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-950 leading-tight">
              Grab Upto 50% Off On Selected Headphone
            </h1>
            <button className="bg-emerald-800 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-emerald-900 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
              Buy Now
            </button>
          </div>
          <div className="hidden md:flex w-full md:w-1/2 justify-end items-center relative pl-8">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
              alt="Premium Headphones" 
              className="h-64 lg:h-80 w-auto object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x400/064e3b/ffffff?text=Premium+Headphones"; }}
            />
          </div>
        </div>
      )}

      {/* Filter Bar (Same as before) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-20">
        <h2 className="text-2xl font-extrabold text-gray-900 hidden lg:block whitespace-nowrap">Headphones For You!</h2>
        
        <div className="flex flex-wrap items-center gap-2.5">
          {Object.keys(FILTER_CATEGORIES).map((filterCategory) => (
            <div key={filterCategory} className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === filterCategory ? null : filterCategory)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium flex items-center transition-all border ${
                  activeFilters[filterCategory] 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-800 hover:text-emerald-800 shadow-sm'
                }`}
              >
                {activeFilters[filterCategory] || filterCategory} 
                {activeFilters[filterCategory] ? (
                  <X className="w-4 h-4 ml-1.5 hover:text-red-500 transition-colors" onClick={(e) => { e.stopPropagation(); toggleFilter(filterCategory, activeFilters[filterCategory]); }} />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1.5 text-gray-400" />
                )}
              </button>

              {openDropdown === filterCategory && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden animate-fade-in z-50">
                  {FILTER_CATEGORIES[filterCategory].map(option => (
                    <button
                      key={option}
                      onClick={() => toggleFilter(filterCategory, option)}
                      className={`w-full text-left px-5 py-2.5 text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors ${
                        activeFilters[filterCategory] === option ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {Object.keys(activeFilters).length > 0 && (
            <button onClick={() => setActiveFilters({})} className="text-red-500 px-4 py-2.5 rounded-full text-sm font-medium flex items-center hover:bg-red-50 transition-colors">
              Clear All <X className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="ml-auto relative w-full lg:w-auto flex justify-end">
          <button 
            onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium flex items-center hover:border-emerald-800 shadow-sm transition-all"
          >
            Sort by: <span className="text-emerald-800 ml-1.5 font-bold">{SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span>
            <ChevronDown className="w-4 h-4 ml-1.5 text-gray-400" />
          </button>
          
          {openDropdown === 'sort' && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden animate-fade-in z-50">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => { setSortBy(option.value); setOpenDropdown(null); }}
                  className={`w-full text-left px-5 py-2.5 text-sm hover:bg-emerald-50 hover:text-emerald-800 transition-colors ${
                    sortBy === option.value ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-gray-900 lg:hidden">Headphones For You!</h2>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((p) => (
              <div key={p.id} className="group relative bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative bg-gray-50 rounded-xl aspect-square mb-5 flex items-center justify-center p-6 overflow-hidden">
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
                    <div className="text-gray-400 text-center">
                      <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <span className="text-xs font-medium">No Image</span>
                    </div>
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
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(p.rating) ? 'text-emerald-500 fill-current' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs font-medium text-gray-400 ml-1.5">({p.reviews})</span>
                  </div>
                  <button onClick={() => addToCart(p.id)} className="w-max px-6 py-2 border-2 border-emerald-800 text-emerald-800 rounded-full text-sm font-bold hover:bg-emerald-800 hover:text-white transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">No matching products found.</h3>
              <p className="text-gray-500 mb-4">Try adjusting or clearing your filters to see more results.</p>
              <button onClick={() => setActiveFilters({})} className="bg-emerald-800 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-900 transition-colors">Clear all filters</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;