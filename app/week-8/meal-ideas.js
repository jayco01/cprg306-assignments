'use client'

import {useState} from "react";

export default function MealIdeas({items}) {
  // local testing
  const apiBaseUrl = process.env.NEXT_PUBLIC_RECIPE_API_BASE_URL || import.meta?.env?.VITE_RECIPE_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_RECIPE_API_KEY || import.meta?.env?.VITE_API_KEY;

  const [ingredients, setIngredients] = useState([]);

  const handleAddingItem = (item) => {
    let itemName = item.name.split(/[\s,]+/);
    setIngredients([...ingredients, itemName[0]]);
  }
  return (
    <div className="bg-custom-green rounded-lg flex flex-col p-8">
      <label for="ingredients"> Select 1 or more ingredients: </label>
      <select id="ingredients" multiple size="5" className="bg-custom-dark-green text-font-size-fluid-0 p-4 rounded-lg" >
        <option key="select">Select Ingredients</option>
        {items.map((item, index) => (
          <option
            onClick={() => handleAddingItem(item)}
            key={item.key}>{item.name}</option>
        ))};
      </select>
    </div>
  )
}