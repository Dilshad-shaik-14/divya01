import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';

export default function RecipeCard({ recipe, onWishlistToggle, isWishlisted, onDelete }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{recipe.title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWishlistToggle(recipe.id);
              }}
              className={`p-2 rounded-full ${
                isWishlisted ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <Heart className="h-6 w-6" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            {user && user.email === recipe.userId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(recipe.id);
                }}
                className="p-2 rounded-full text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-600 mt-2">{recipe.description}</p>
        <div className="mt-4">
          <span className="text-sm text-gray-500">
            Cooking time: {recipe.cookingTime} minutes
          </span>
        </div>
      </div>
    </div>
  );
}