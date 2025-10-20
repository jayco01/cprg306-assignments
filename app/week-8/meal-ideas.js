'use client'

import {useState} from "react";

export default function MealIdeas({items}) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_RECIPE_API_BASE_URL || import.meta?.env?.VITE_RECIPE_API_BASE_URL;
  const apiKeyRaw = process.env.NEXT_PUBLIC_RECIPE_API_KEY || import.meta?.env?.VITE_API_KEY;
  const apiKey = apiKeyRaw.replace(/^['"]+|['"]+$/g, '');

  const [recipe, setRecipe] = useState(null);
  const [instruction, setInstruction] = useState([]);


  const requestOptions = {
    method: 'GET',
    headers: { 'X-Api-Key': apiKey},
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
      setRecipe(Array.isArray(recipeResponse) ? recipeResponse[0] : recipeResponse);
      console.log("instructions: " + recipeResponse[0].instructions);
      instructionsToArray(recipeResponse[0].instructions);
    } catch (error) {
      console.log(error);
    }
  }


  function isolateName(item) {
    let ingredient = item.split(/[,]+/);
    ingredient = ingredient[0].replace(/\p{Emoji}/gu, '')
    return ingredient.trim();
  }

  const instructionsToArray = (instructions) => {
      setInstruction(instructions.split(". "));
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
      <div className="bg-custom-green rounded-lg p-8">
        {recipe ? (
          <div>
            <h3 className="mt-4 font-bold">{recipe.title}</h3>
            <p className="underline">{recipe.servings}</p>

            <h4 className="mt-4 font-semibold">Ingredients</h4>
            <ol className="list-disc list-inside">
              {Array.isArray(recipe.ingredients) ? recipe.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              )) : <li>{String(recipe.ingredients)}</li>}
            </ol>

            <h4 className="mt-4 font-semibold">Instructions</h4>
            <ul className="list-disc list-inside">
              {instruction.map((item, index) => (
                <li className="list-decimal" key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}