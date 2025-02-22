import React from 'react';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    // Fetch recipes from local storage or other storage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);
  }, []);

  const handleWishlistToggle = (recipeId) => {
    // Implement wishlist toggle functionality
  };

  const handleDelete = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
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
            isWishlisted={false} // Implement logic to check if the recipe is wishlisted
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}