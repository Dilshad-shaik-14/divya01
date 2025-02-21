import React from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState(null);

  React.useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const foundRecipe = storedRecipes.find((recipe) => recipe.id === id);
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-600 mb-4">{recipe.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <ol className="list-decimal list-inside">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      <div>
        <span className="text-sm text-gray-500">
          Cooking time: {recipe.cookingTime} minutes
        </span>
      </div>
    </div>
  );
}