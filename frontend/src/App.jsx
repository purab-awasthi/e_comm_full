import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading pages can be added here, but for simplicity we import directly.
// We will create these pages in the next steps.
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminPanel from './pages/AdminPanel';
import Deals from './pages/Deals';
import WhatsNew from './pages/WhatsNew';
// Quick Placeholder Component for pages you haven't built yet
const PlaceholderPage = ({ title }) => (
  <div className="flex-grow flex items-center justify-center py-32">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-extrabold text-emerald-900">{title}</h1>
      <p className="text-gray-500 text-lg">We are currently building this page. Check back soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <Routes>
          {/* Your Core Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />

          {/* NEW: Placeholder Routes for Navbar links */}
          <Route path="/deals" element={<PlaceholderPage title="Today's Deals" />} />
          <Route path="/new" element={<PlaceholderPage title="What's New" />} />
          <Route path="/delivery" element={<PlaceholderPage title="Delivery Information" />} />
          
          {/* Wrapped profile in a protected route since it requires a user */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <PlaceholderPage title="User Profile" />
            </ProtectedRoute>
          } />

          {/* 404 Catch-All (If they type a random URL) */}
          <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;