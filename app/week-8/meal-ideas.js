'use client'

import {useState} from "react";

export default function MealIdeas({items}) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_RECIPE_API_BASE_URL || import.meta?.env?.VITE_RECIPE_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_RECIPE_API_KEY || import.meta?.env?.VITE_API_KEY;

  const [recipe, setRecipe] = useState("");
  // const [ingredient, setIngredient] = useState("");


  const requestOptions = {
    method: 'GET',
    headers: { 'X-Api-Key': '0qNaLVxKR8vwYOBQ6/W3HQ==O5pM8ix5t0Mu5ajT'},
    contentType: 'application/json'
  };

  const handleGettingRecipe = async (item) => {
    let ingredient = isolateName(item.target.value);
    const url = `${apiBaseUrl}${encodeURIComponent(ingredient)}`;

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`Could not find ${ingredient}, ${response.status} ${response.statusText}`);
      }
      const recipeResponse = await response.json();
      setRecipe(recipeResponse);
    } catch (error) {
      console.log(error);
    }
  }


  function isolateName(item) {
    let ingredient = item.split(/[,]+/);
    ingredient = ingredient[0].replace(/\p{Emoji}/gu, '')
    return ingredient.trim();
  }

  return (
    <div className="bg-custom-green rounded-lg flex flex-col p-8">
      <div>
        <select
          id="ingredients"
          className="bg-custom-dark-green text-font-size-fluid-0 p-4 rounded-lg"
          onChange={handleGettingRecipe}
          defaultValue=""
        >
          <option key="label" value="" disabled>Select an ingredient</option>
          {items.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>

      </div>
    </div>
  )
}