import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [ingredients, setIngredients] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [cookingTime, setCookingTime] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleCreateRecipe = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      const newRecipe = {
        id: Date.now().toString(),
        title,
        description,
        ingredients: ingredients.split(','),
        instructions: instructions.split(','),
        cookingTime: parseInt(cookingTime, 10),
        imageUrl: reader.result,
        userId: JSON.parse(localStorage.getItem('user')).email,
        createdAt: new Date().toISOString(),
      };
      const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
      storedRecipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(storedRecipes));
      navigate('/');
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      reader.onloadend();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
      <form onSubmit={handleCreateRecipe}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients (comma separated)</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instructions (comma separated)</label>
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cooking Time (minutes)</label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}