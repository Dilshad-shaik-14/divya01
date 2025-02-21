import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Utensils } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [cookingTime, setCookingTime] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [ingredients, setIngredients] = React.useState(['']);
  const [instructions, setInstructions] = React.useState(['']);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('recipes')
        .insert({
          title,
          description,
          cooking_time: parseInt(cookingTime),
          image_url: imageUrl,
          ingredients: ingredients.filter(i => i.trim()),
          instructions: instructions.filter(i => i.trim()),
          user_id: user.id
        });

      if (error) throw error;

      toast.success('Recipe created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <Utensils className="h-8 w-8 text-indigo-600 mr-2" />
        <h1 className="text-3xl font-bold">Create New Recipe</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cooking Time (minutes)</label>
          <input
            type="number"
            required
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
          >
            + Add Ingredient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="mt-2">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddInstruction}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
          >
            + Add Step
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
}