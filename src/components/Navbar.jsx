import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Heart, PlusCircle, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl">RecipeHub</span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-6">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-gray-600 hover:text-indigo-600">
              <Heart className="h-6 w-6" />
            </Link>
            <Link to="/create" className="text-gray-600 hover:text-indigo-600">
              <PlusCircle className="h-6 w-6" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-indigo-600"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}