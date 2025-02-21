import React from 'react';
import { supabase } from '../lib/supabase';
import RecipeCard from '../components/RecipeCard';
import toast from 'react-hot-toast';

export default function Home() {
  const [recipes, setRecipes] = React.useState([]);
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    fetchRecipes();
    fetchWishlist();
  }, []);

  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch recipes');
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
      <h1 className="text-3xl font-bold mb-8">Latest Recipes</h1>
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
    </div>
  );
}