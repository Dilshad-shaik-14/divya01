import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import RecipeCard from '../components/RecipeCard';
import toast from 'react-hot-toast';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [recipes, setRecipes] = React.useState([]);
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    if (query) {
      searchRecipes();
      fetchWishlist();
    }
  }, [query]);

  const searchRecipes = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .ilike('title', `%${query}%`);

    if (error) {
      toast.error('Failed to search recipes');
      return;
    }

    setRecipes(data);
  };

  const fetchWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('wishlist')
      .select('recipe_id')
      .eq('user_id', user.id);

    if (error) {
      toast.error('Failed to fetch wishlist');
      return;
    }

    setWishlist(data.map(item => item.recipe_id));
  };

  const toggleWishlist = async (recipeId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }

    if (wishlist.includes(recipeId)) {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId);

      if (error) {
        toast.error('Failed to remove from wishlist');
        return;
      }

      setWishlist(wishlist.filter(id => id !== recipeId));
      toast.success('Removed from wishlist');
    } else {
      const { error } = await supabase
        .from('wishlist')
        .insert({ user_id: user.id, recipe_id: recipeId });

      if (error) {
        toast.error('Failed to add to wishlist');
        return;
      }

      setWishlist([...wishlist, recipeId]);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <SearchIcon className="h-8 w-8 text-indigo-600 mr-2" />
        <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center text-gray-500">
          No recipes found matching "{query}"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isWishlisted={wishlist.includes(recipe.id)}
              onWishlistToggle={() => toggleWishlist(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}