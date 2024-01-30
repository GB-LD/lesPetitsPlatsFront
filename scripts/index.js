/* eslint-disable no-unused-vars */
import '../style.css';
import API from './utils/API';
import RecipeCard from './templates/RecipeCard';
import DataList from './models/DataLists';
import Filter from './templates/Filter';
import TagFilter from './utils/TagFilter';

// manage data
const recipesData = await API.getData('data/recipes.json');
const ingredientsList = DataList.getIngredientsList(recipesData);
const applianceList = DataList.getApplianceList(recipesData);
const ustensilsList = DataList.getUstensils(recipesData);

// DOM elements
const filtersForm = document.querySelector('#filters-form');
const recipeList = document.querySelector('#recipesList');

// filters creation
const tagFilter = new TagFilter();
const ustensilsFilter = new Filter('Ustensiles', ustensilsList, filtersForm, tagFilter);
ustensilsFilter.createFilter();
const applianceFilter = new Filter('Appareils', applianceList, filtersForm, tagFilter);
applianceFilter.createFilter();
const ingredientFilter = new Filter('Ingrédients', ingredientsList, filtersForm, tagFilter);
ingredientFilter.createFilter();

// recipes card creation
recipesData.forEach(recipe => {
  const recipeCard = new RecipeCard(recipe);
  recipeList.appendChild(recipeCard.createRecipeCard());
});
