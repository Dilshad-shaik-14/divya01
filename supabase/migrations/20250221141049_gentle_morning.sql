/*
  # Initial Schema Setup for Recipe App

  1. New Tables
    - recipes
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - ingredients (text[])
      - instructions (text[])
      - cooking_time (integer)
      - image_url (text)
      - user_id (uuid, foreign key)
      - created_at (timestamptz)
    
    - wishlist
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - recipe_id (uuid, foreign key)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations
*/

-- Create recipes table
CREATE TABLE recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  ingredients text[] NOT NULL,
  instructions text[] NOT NULL,
  cooking_time integer NOT NULL,
  image_url text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create wishlist table
CREATE TABLE wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  recipe_id uuid NOT NULL REFERENCES recipes(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Enable RLS
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Policies for recipes
CREATE POLICY "Anyone can read recipes"
  ON recipes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create their own recipes"
  ON recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes"
  ON recipes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes"
  ON recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for wishlist
CREATE POLICY "Users can view their own wishlist"
  ON wishlist
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own wishlist"
  ON wishlist
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);