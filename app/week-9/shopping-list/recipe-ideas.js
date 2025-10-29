'use client'

import { useEffect, useState, useMemo } from "react";

const IMAGE_URL_PARAM = "filter.php?i=";
const RECIPE_URL_PARAM = "lookup.php?i=";


function isolateName(item) {
  let ingredient = item.split(/[,]+/);
  ingredient = ingredient[0].replace(/\p{Emoji}/gu, '');
  return ingredient.trim();
}

export default function RecipeIdeas({ items }) {

  // Clean the base URL once
  const mealDbUrl = useMemo(() => {
    const mealDbUrlRaw = process.env.NEXT_PUBLIC_MEALDB_BASE_URL || '';
    return mealDbUrlRaw.replace(/^['"]+|['"]+$/g, '');
  }, []);

  const [recipeArray, setRecipeArray] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);

  /**
   * Fetches a list of meals based on a selected ingredient.
   */
  const handleGettingAllRecipes = async (event) => {
    const ingredient = isolateName(event.target.value);
    const url = `${mealDbUrl}${IMAGE_URL_PARAM}${encodeURIComponent(ingredient)}`;

    setRecipeArray([]);
    setRecipeInfo([]);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not find ${ingredient}, ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setRecipeArray(data?.meals || []);

    } catch (error) {
      console.error(error);
      // Ensure state is clear on error
      setRecipeArray([]);
    }
  }

  /**
   *fetch detailed recipe information whenever the list of recipes (recipeArray) changes
   */
  useEffect(() => {
    if (!recipeArray.length) {
      setRecipeInfo([]);
      return;
    }

    const fetchRecipeInfo = async () => {
      try {
        // get all details all at once or fail
        const details = await Promise.all(
          recipeArray.map(async (recipe) => {
            const url = `${mealDbUrl}${RECIPE_URL_PARAM}${encodeURIComponent(recipe.idMeal)}`;
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`Unable to fetch recipe details for ${recipe.idMeal}`);
            }

            const json = await response.json();
            // Return the first meal from the details response
            return json.meals?.[0];
          })
        );
        setRecipeInfo(details.filter(Boolean));
      } catch (e) {
        console.error(e);
        setRecipeInfo([]);
      }
    };

    fetchRecipeInfo();

  }, [recipeArray, mealDbUrl]);

  // filter only when the item array change
  // i.e. when a new item is added to the list
  const filteredItems = useMemo(() => {
    return items.filter(i => i.category.toLowerCase() !== 'household');
  }, [items]);


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
          <option value="" disabled>Select an ingredient</option>
          {filteredItems.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="p-8">
        {/* Map over recipeArray and use index to get corresponding details */}
        {recipeArray.map((recipe, index) => {
          const details = recipeInfo[index];
          if (!details) {
            return (
              <details key={recipe.idMeal}>
                <summary>{recipe.strMeal} (Loading...)</summary>
              </details>
            );
          }

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
                  className="my-2"
                />
              )}
              {details.strInstructions && (
                <p className="mt-2 whitespace-pre-line">{details.strInstructions}</p>
              )}
            </details>
          );
        })}
      </div>
    </div>
  )
}