'use client'

import {useEffect, useState} from "react";
import Image from "next/image";

export default function RecipeIdeas({items}) {

  const [recipeName, setRecipeName] = useState(null);
  const [instruction, setInstruction] = useState([]);
  const [recipeWebUrl, setRecipeWebUrl] = useState('Please select an ingredient to display a Recipe Idea.');

  const mealDbUrlRaw = process.env.NEXT_PUBLIC_MEALDB_BASE_URL;
  const mealDbUrl =  mealDbUrlRaw.replace(/^['"]+|['"]+$/g, '');
  const imageUrlParam = "filter.php?i=";
  const recipeUrlParam = "lookup.php?i=";


  // console.log(mealDbUrl);


  const handleGettingRecipe = async (item) => {
    let ingredient = isolateName(item.target.value);
    const url = `${mealDbUrl}${imageUrlParam}${encodeURIComponent(ingredient)}`;
    // console.log(url);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not find ${ingredient}, ${response.status} ${response.statusText}`);
      }

      const recipeResponse = await response.json();

      if (!recipeResponse || recipeResponse.meals == null) {
        setRecipeWebUrl("No Recipe found with " + ingredient + " as the main ingredient");
        console.log("No Recipe found with " + ingredient + " as the main ingredient");
        return;
      }

      setRecipeName(recipeResponse?.meals[0]?.strMeal);

      const imageUrl = recipeResponse?.meals[0]?.strMealThumb;
      setRecipeWebUrl(imageUrl.replace(/^['"]+|['"]+$/g, ''));

      const mealId = recipeResponse?.meals[0]?.idMeal;
      console.log("mealId",mealId);

    } catch (error) {
      console.log(error);
    }
  }

  const handleRecipeImage = () => {
    return (
      <div className="flex justify-center align-middle max-h-1/4">
        {recipeName ?
          <img
            src={recipeWebUrl}
            alt={recipeName ? recipeName : recipeWebUrl}
          /> :
          <p>{recipeWebUrl}</p>
        }

      </div>
    );
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
    <div className="bg-custom-darker-green rounded-lg flex flex-col p-8 gap-4 h-fit">
      <h2>Meal Ideas</h2>
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
      </div>
      {handleRecipeImage()}
      <div className="p-8">
        {recipeName ? (
          <div>
            <h3 className="mt-4 font-bold">{recipeName.title}</h3>
            <p className="underline">{recipeName.servings}</p>

            <h4 className="mt-4 font-semibold">Ingredients</h4>
            <ol className="list-disc list-inside">
              {Array.isArray(recipeName.ingredients) ? recipeName.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              )) : <li>{String(recipeName.ingredients)}</li>}
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