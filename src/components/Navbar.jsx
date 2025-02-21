import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleLogout = async () => {
    // Clear user session
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-5">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-2xl text-gray-800">RecipeHub</span>
            </Link>
            <Link to="/" className="text-indigo-600 text-2xl font-bold">
              Home
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

          <div className="flex items-center space-x-8">
            <Link to="/wishlist" className="text-gray-800 text-2xl font-bold hover:text-indigo-600">
              <span>Wishlist</span>
            </Link>
            <Link to="/create" className="text-gray-800 text-2xl font-bold hover:text-indigo-600">
              <span>Create</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-800 text-2xl font-bold hover:text-indigo-600"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}