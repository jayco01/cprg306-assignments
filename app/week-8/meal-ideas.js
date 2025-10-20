'use client'

import {useState} from "react";

export default function MealIdeas({items}) {
  // local testing
  const apiBaseUrl = process.env.NEXT_PUBLIC_RECIPE_API_BASE_URL || import.meta?.env?.VITE_RECIPE_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_RECIPE_API_KEY || import.meta?.env?.VITE_API_KEY;

  const [recipe, setRecipe] = useState("");
  const [ingredient, setIngredient] = useState("");

  // const [ingredients, setIngredients] = useState([]);
  // const [ingredientClass, setIngredientClass] = useState("");
  //
  const handleGettingRecipe = (item) => {
    setIngredient(item.name.split(/[\s,]+/));

  }

  const handleApiCall = async (ingredient) => {

  }

  console.log(ingredients);
  return (
    <div className="bg-custom-green rounded-lg flex flex-col p-8">
      <label htmlFor="ingredients"> Select a ingredient: </label>
      <select id="ingredients" className="bg-custom-dark-green text-font-size-fluid-0 p-4 rounded-lg" >
        {items.map((item) => (
          <option
            onClick={() => handleGettingRecipe(item)}
            key={item.key}
            className={`${ingredients.includes(item) ? "bg-custom-green" : "bg-custom-darker-green"} `}
          >
              {item.name}
          </option>
        ))};
      </select>
    </div>
  )
}