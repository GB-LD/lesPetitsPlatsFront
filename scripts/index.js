/* eslint-disable no-unused-vars */
import '../style.css';
import API from './utils/API';
import RecipeCard from './templates/RecipeCard';

const recipesData = await API.getData('data/recipes.json');

const recipeList = document.querySelector('#recipesList');

recipesData.forEach(recipe => {
  const recipeCard = new RecipeCard(recipe);
  recipeList.appendChild(recipeCard.createRecipeCard());
});
