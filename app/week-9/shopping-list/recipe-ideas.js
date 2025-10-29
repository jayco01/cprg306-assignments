'use client'

import {useEffect, useState} from "react";


export default function RecipeIdeas({items}) {

  const mealDbUrlRaw = process.env.NEXT_PUBLIC_MEALDB_BASE_URL;
  const mealDbUrl =  mealDbUrlRaw.replace(/^['"]+|['"]+$/g, '');
  const imageUrlParam = "filter.php?i=";
  const recipeUrlParam = "lookup.php?i=";

  const [recipeArray, setRecipeArray] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
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

      const data = await response.json();
      if (!data || data.meals == null) {
        setRecipeArray([]);
        setRecipeInfo([]);
        return;
      }

      setRecipeArray(data.meals);
      console.log(recipeResponse);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!recipeArray.length) {
      setRecipeInfo([]);
      return;
    }

    const fetchRecipeInfo = async () => {
      try {
        const details = await Promise.all(
          recipeArray.map(async (recipe) => {
            const url = `${mealDbUrl}${recipeUrlParam}${encodeURIComponent(recipe.idMeal)}`;

            const response = await fetch(url);

            if (!response.ok) {
              throw new Error('Unable to fetch recipe.')
            };

            const json = await response.json();

            return json.meals?.[0];
          })
        );
        setRecipeInfo(details);
      } catch (e) {
        console.error(e);
      }
    };

    fetchRecipeInfo();
  }, [recipeArray, mealDbUrl]);



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
      <div className="p-8">
        {recipeArray.map((recipe, index) => {
          const details = recipeInfo[index];
          return (
            <details key={recipe.idMeal}>
              <summary>{recipe.strMeal}</summary>
              {recipe.strMealThumb && (
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width="400"
                  height="400"
                  loading="lazy"
                />
              )}
              {details?.strInstructions && (
                <p className="mt-2 whitespace-pre-line">{details.strInstructions}</p>
              )}
            </details>
          );
        })}
      </div>
    </div>
  )
}