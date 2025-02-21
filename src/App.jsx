import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
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
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;