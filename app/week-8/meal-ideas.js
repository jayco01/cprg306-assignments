'use client'

import {useState} from "react";

export default function MealIdeas() {
  // local testing
  const apiBaseUrl = process.env.NEXT_PUBLIC_RECIPE_API_BASE_URL || import.meta?.env?.VITE_RECIPE_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_RECIPE_API_KEY || import.meta?.env?.VITE_API_KEY;

  const [ingredients, setIngredients] = useState([]);
  console.log(apiBaseUrl);
}