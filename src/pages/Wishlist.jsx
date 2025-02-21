import React from 'react';
import RecipeCard from '../components/RecipeCard';

export default function Wishlist() {
  const [wishlist, setWishlist] = React.useState([]);
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    // Fetch wishlist from local storage or other storage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);

    // Fetch all recipes from local storage or other storage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);
  }, []);

  const handleWishlistToggle = (recipeId) => {
    const updatedWishlist = wishlist.includes(recipeId)
      ? wishlist.filter((id) => id !== recipeId)
      : [...wishlist, recipeId];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const wishlistRecipes = recipes.filter((recipe) => wishlist.includes(recipe.id));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onWishlistToggle={handleWishlistToggle}
            isWishlisted={wishlist.includes(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
}