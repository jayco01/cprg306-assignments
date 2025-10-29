'use client'

import {useEffect, useState} from "react";
import Image from "next/image";

export default function RecipeIdeas({items}) {

  const mealDbUrlRaw = process.env.NEXT_PUBLIC_MEALDB_BASE_URL;
  const mealDbUrl =  mealDbUrlRaw.replace(/^['"]+|['"]+$/g, '');
  const imageUrlParam = "filter.php?i=";
  const recipeUrlParam = "lookup.php?i=";

  const [recipeArray, setRecipeArray] = useState([]);
  const [choseMealId, setChoseMealId] = useState(null);

  // const [recipeWebUrl, setRecipeWebUrl] = useState('Please select an ingredient to display a Recipe Idea.');


  const handleGettingAllRecipes = async (item) => {
    let ingredient = isolateName(item.target.value);
    const url = `${mealDbUrl}${imageUrlParam}${encodeURIComponent(ingredient)}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not find ${ingredient}, ${response.status} ${response.statusText}`);
      }

      const recipeResponse = await response.json();

      if (!recipeResponse || recipeResponse.meals == null) {
        // setRecipeWebUrl("No Recipe found with " + ingredient + " as the main ingredient");
        console.log("No Recipe found with " + ingredient + " as the main ingredient");
        return;
      }

      setRecipeArray(recipeResponse?.meals);
      console.log(recipeResponse);
      // recipeResponse?.meals[0]?.strMeal
      //
      // const imageUrl = recipeResponse?.meals[0]?.strMealThumb;
      // setRecipeWebUrl(imageUrl.replace(/^['"]+|['"]+$/g, ''));
      //
      // const mealId = recipeResponse?.meals[0]?.idMeal;
      // console.log("mealId",mealId);

    } catch (error) {
      console.log(error);
    }
  }

  const handleRecipeImage = () => {
    return (
      <div className="flex justify-center align-middle max-h-1/4">

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
          onChange={handleGettingAllRecipes}
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
        {recipeArray ? (
          recipeArray.map(recipe => (
            <details key={recipe.idMeal}>
              <summary>{recipe.strMeal}</summary>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                loading="lazy"
              />
            </details>
          ))


        ) : null}
      </div>
    </div>
  )
}