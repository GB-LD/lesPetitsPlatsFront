/* eslint-disable no-unused-vars */
import '../style.css';
import { recipes } from '../assets/data/recipes';
import RecipeCard from './templates/RecipeCard';

const recipeList = document.querySelector('#recipesList');

recipes.forEach(recipe => {
  const recipeCard = new RecipeCard(recipe);
  recipeList.appendChild(recipeCard.createRecipeCard());
});
