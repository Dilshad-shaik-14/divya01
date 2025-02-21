import React from 'react';
import { supabase } from '../lib/supabase';
import RecipeCard from '../components/RecipeCard';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const [recipes, setRecipes] = React.useState([]);
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    fetchWishlistedRecipes();
  }, []);

  const fetchWishlistedRecipes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: wishlistData, error: wishlistError } = await supabase
      .from('wishlist')
      .select('recipe_id')
      .eq('user_id', user.id);

    if (wishlistError) {
      toast.error('Failed to fetch wishlist');
      return;
    }

    const recipeIds = wishlistData.map(item => item.recipe_id);
    setWishlist(recipeIds);

    if (recipeIds.length === 0) {
      setRecipes([]);
      return;
    }

    const { data: recipesData, error: recipesError } = await supabase
      .from('recipes')
      .select('*')
      .in('id', recipeIds);

    if (recipesError) {
      toast.error('Failed to fetch recipes');
      return;
    }

    setRecipes(recipesData);
  };

  const toggleWishlist = async (recipeId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please login to manage wishlist');
      return;
    }

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
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    toast.success('Removed from wishlist');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <Heart className="h-8 w-8 text-indigo-600 mr-2" />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center text-gray-500">
          No recipes in your wishlist yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isWishlisted={true}
              onWishlistToggle={() => toggleWishlist(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}