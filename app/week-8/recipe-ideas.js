'use client'

import {useEffect, useState} from "react";

export default function RecipeIdeas({items}) {

  const apiBaseUrl = process.env.NEXT_PUBLIC_RECIPE_API_BASE_URL;
  const apiKeyRaw = process.env.NEXT_PUBLIC_RECIPE_API_KEY;
  const recipeApiKey = apiKeyRaw.replace(/^['"]+|['"]+$/g, '');

  const apiImageUrl = process.env.NEXT_PUBLIC_IMAGE_API_BASE_URL;
  const apiUrlParams = process.env.NEXT_PUBLIC_IMAGE_API_PARAMETERS;
  const imageApiKeyRaw = process.env.NEXT_PUBLIC_IMAGE_API_KEY;
  const imageApiKey = imageApiKeyRaw.replace(/^['"]+|['"]+$/g, '');


  const [recipe, setRecipe] = useState(null);
  const [instruction, setInstruction] = useState([]);
  const [recipeWebUrl, setRecipeWebUrl] = useState('Please select an ingredient to display a Recipe Idea.');



  console.log(imageApiKey);

  useEffect(() => {
    const fetchRecipeImage = async () => {
      if (recipe) {
        let query = encodeURIComponent(recipe.title);
        let url = `${apiImageUrl}${query}${apiUrlParams}`;
        console.log(url);

        try{
          const imageRequestOptions = {
            method: 'GET',
            headers: { 'Authorization': imageApiKey,'Content-Type': 'application/json'}
          };
          const response = await fetch(url,imageRequestOptions);

          if (!response.ok) {
            console.log(response.status);
            console.log(response.statusText);
            return;
          }

          const imageResponse = await response.json();
          console.log(imageResponse);
          const imageSrc = imageResponse?.photos[0]?.src?.original;
          console.log(imageSrc);
          setRecipeWebUrl(imageSrc || "Image not found");

        } catch(error) {
          console.log(error);
        }
      }
    }
    fetchRecipeImage();
  }, [apiUrlParams, recipe, apiImageUrl, imageApiKey]);


  const handleRecipeImage = () => {
    return (
      <div>
      {recipe ?
          <img src={recipeWebUrl} alt={recipe ? recipe.title : recipeWebUrl} /> :
          <p>{recipeWebUrl}</p>
      }
      </div>
    );
  }


  const ingredientsRequestOptions = {
    method: 'GET',
    headers: { 'X-Api-Key': recipeApiKey},
    contentType: 'application/json'
  };

  const handleGettingRecipe = async (item) => {
    let ingredient = isolateName(item.target.value);
    const url = `${apiBaseUrl}${encodeURIComponent(ingredient)}`;

    try {
      const response = await fetch(url, ingredientsRequestOptions);

      if (!response.ok) {
        throw new Error(`Could not find ${ingredient}, ${response.status} ${response.statusText}`);
      }
      const recipeResponse = await response.json();
      setRecipe(Array.isArray(recipeResponse) ? recipeResponse[0] : recipeResponse);
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
          className="bg-custom-offWhite text-custom-darkest-green text-font-size-fluid-0 p-4 rounded-lg"
          onChange={handleGettingRecipe}
          defaultValue=""
        >
          <option key="label" value="" className="text-custom-offWhite" disabled>Select an ingredient</option>
          {items.filter(i => i.category.toLowerCase() !== 'household').map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <div>
          {handleRecipeImage()}
        </div>
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