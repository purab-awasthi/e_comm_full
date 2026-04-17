import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  Package, 
  ShieldCheck, 
  Search, 
  Phone, 
  ChevronDown,
  ShoppingBag,
  Globe,
  MapPin
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // States for interactivity
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Ref for clicking outside to close dropdowns
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Routes to home with a search parameter
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 z-50" ref={navRef}>
      {/* Top Bar - Dark Green */}
      <div className="bg-emerald-800 text-white text-xs py-2 hidden md:block relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center font-medium">
          <div className="flex items-center space-x-2">
            <Phone className="w-3 h-3" />
            <span>+001234567890</span>
          </div>
          <div className="text-center flex-grow">
            <span>Get 50% Off On Selected Items | <Link to="/deals" className="underline hover:text-emerald-200 transition">Shop Now</Link></span>
          </div>
          <div className="flex items-center space-x-6 relative">
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('lang')}
                className="flex items-center hover:text-emerald-200 transition focus:outline-none"
              >
                Eng <ChevronDown className="w-3 h-3 ml-1" />
              </button>
              {openDropdown === 'lang' && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white text-gray-800 rounded-lg shadow-xl py-1 overflow-hidden">
                  <button className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-800 transition">Eng</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-800 transition">Esp</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-800 transition">Fra</button>
                </div>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('location')}
                className="flex items-center hover:text-emerald-200 transition focus:outline-none"
              >
                Location <ChevronDown className="w-3 h-3 ml-1" />
              </button>
              {openDropdown === 'location' && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white text-gray-800 rounded-lg shadow-xl py-1 overflow-hidden">
                  <button className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-800 transition">India</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-800 transition">USA</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-800 transition">UK</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 relative z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center text-2xl font-extrabold text-emerald-800 tracking-tight shrink-0">
              <div className="bg-orange-500 rounded-lg p-1 mr-2">
                <ShoppingBag className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              Clickart
            </Link>

            {/* Middle Nav Links */}
            <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700 ml-8">
              {/* Categories Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('categories')}
                  className={`flex items-center transition focus:outline-none ${openDropdown === 'categories' ? 'text-emerald-800' : 'hover:text-emerald-800'}`}
                >
                  Categories <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === 'categories' ? 'rotate-180' : ''}`} />
                </button>
                
                {openDropdown === 'categories' && (
                  <div className="absolute top-full left-0 mt-6 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                    <Link to="/?category=Audio" onClick={() => setOpenDropdown(null)} className="block px-5 py-3 text-sm hover:bg-emerald-50 hover:text-emerald-800 transition">Audio & Headphones</Link>
                    <Link to="/?category=Electronics" onClick={() => setOpenDropdown(null)} className="block px-5 py-3 text-sm hover:bg-emerald-50 hover:text-emerald-800 transition">Electronics</Link>
                    <Link to="/?category=Gaming" onClick={() => setOpenDropdown(null)} className="block px-5 py-3 text-sm hover:bg-emerald-50 hover:text-emerald-800 transition">Gaming Consoles</Link>
                    <Link to="/?category=Home" onClick={() => setOpenDropdown(null)} className="block px-5 py-3 text-sm hover:bg-emerald-50 hover:text-emerald-800 transition">Home Appliances</Link>
                  </div>
                )}
              </div>

              <Link to="/deals" className="hover:text-emerald-800 transition">Deals</Link>
              <Link to="/new" className="hover:text-emerald-800 transition">What's New</Link>
              <Link to="/delivery" className="hover:text-emerald-800 transition">Delivery</Link>
            </div>

            {/* Search Bar Form */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Product"
                className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-800 rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1.5 p-1 text-gray-400 hover:text-emerald-800 transition rounded-full hover:bg-gray-200"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Right Icons / Auth */}
            <div className="flex items-center space-x-6 shrink-0">
              {user ? (
                <>
                  <Link to="/orders" className="text-gray-700 hover:text-emerald-800 transition flex items-center font-medium">
                    <Package className="w-5 h-5 mr-1.5" />
                    <span className="hidden xl:inline">Orders</span>
                  </Link>
                  
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" className="text-emerald-700 font-medium hover:text-emerald-900 flex items-center">
                      <ShieldCheck className="w-5 h-5 mr-1.5" />
                      <span className="hidden xl:inline">Admin</span>
                    </Link>
                  )}
                  
                  <div className="flex items-center space-x-3 pl-2">
                    <Link to="/profile" className="text-sm font-semibold text-gray-800 flex items-center hover:text-emerald-800 transition">
                      <User className="w-5 h-5 mr-1.5 text-gray-600" />
                      <span className="hidden sm:inline">{user.name}</span>
                    </Link>
                    <button 
                      onClick={logout}
                      className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4 text-sm font-medium">
                  <Link to="/login" className="flex items-center text-gray-700 hover:text-emerald-800 transition">
                    <User className="w-5 h-5 mr-1.5" />
                    Account
                  </Link>
                </div>
              )}

              {/* Cart always visible */}
              <Link to="/cart" className="text-gray-700 hover:text-emerald-800 transition flex items-center font-medium">
                <ShoppingCart className="w-5 h-5 mr-1.5" />
                <span className="hidden sm:inline">Cart</span>
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;