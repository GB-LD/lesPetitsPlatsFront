/* eslint-disable no-unused-vars */
import '../style.css';
import API from './utils/API';
import DataList from './models/DataLists';
import Filter from './templates/Filter';
import DataFilter from './models/DataFilter';
import RecipesSection from './templates/RecipesSection';

// manage data
const recipesData = await API.getData('data/recipes.json');
const ingredientsList = DataList.getIngredientsList(recipesData);
const applianceList = DataList.getApplianceList(recipesData);
const ustensilsList = DataList.getUstensils(recipesData);

// DOM elements
const filtersForm = document.querySelector('#filters-form');

// filters creation
const dataFilter = new DataFilter(recipesData);
const ustensilsFilter = new Filter('Ustensiles', ustensilsList, filtersForm, dataFilter);
ustensilsFilter.createFilter();
const applianceFilter = new Filter('Appareils', applianceList, filtersForm, dataFilter);
applianceFilter.createFilter();
const ingredientFilter = new Filter('Ingrédients', ingredientsList, filtersForm, dataFilter);
ingredientFilter.createFilter();

dataFilter.setFilters(ustensilsFilter, applianceFilter, ingredientFilter);

RecipesSection.generateRecipesList(recipesData);
