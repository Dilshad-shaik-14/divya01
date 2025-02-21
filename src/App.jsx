import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Simulate fetching user session from localStorage or other storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    // Simulate listening to auth state changes
    const handleAuthChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      setUser(updatedUser);
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {user && <Navbar />}
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Auth />}
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={user ? <CreateRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={user ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/wishlist"
            element={user ? <Wishlist /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipe/:id"
            element={user ? <RecipeDetail /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;