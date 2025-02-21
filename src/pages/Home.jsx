import React from 'react';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const [recipes, setRecipes] = React.useState([]);
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    // Fetch recipes from local storage or other storage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);

    // Fetch wishlist from local storage or other storage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleWishlistToggle = (recipeId) => {
    const updatedWishlist = wishlist.includes(recipeId)
      ? wishlist.filter((id) => id !== recipeId)
      : [...wishlist, recipeId];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
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