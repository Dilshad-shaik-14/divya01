import React from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    // Fetch recipes from local storage or other storage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const filteredRecipes = storedRecipes.filter((recipe) => {
      const lowerCaseQuery = query.toLowerCase();
      const cookingTimeMatch = lowerCaseQuery.match(/(\d+)\s*min/);
      const cookingTime = cookingTimeMatch ? parseInt(cookingTimeMatch[1], 10) : null;

      if (cookingTime !== null) {
        return recipe.cookingTime <= cookingTime;
      }

      return recipe.title.toLowerCase().includes(lowerCaseQuery);
    });
    setRecipes(filteredRecipes);
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}