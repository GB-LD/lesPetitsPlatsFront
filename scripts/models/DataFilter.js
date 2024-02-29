import RecipesSection from '../templates/RecipesSection';
import DataList from './DataLists';

export default class DataFilter {
  constructor (recipesList) {
    this.recipesList = recipesList;
    this._ingredients = [];
    this._appliances = [];
    this._ustensils = [];
    this._tagList = [];
    this._recipeListFiltered = [];
    this.ustensilsFilter = null;
    this.applianceFilter = null;
    this.ingredientFilter = null;
    this.searchBar = null;
  }

  setFilters (ustensilsFilter, applianceFilter, ingredientFilter) {
    this.ustensilsFilter = ustensilsFilter;
    this.applianceFilter = applianceFilter;
    this.ingredientFilter = ingredientFilter;
  }

  setSearchBar (searchBar) {
    this.searchBar = searchBar;
  }

  get ingredients () {
    return this._ingredients;
  }

  set ingredients (value) {
    if (!this._ingredients.includes(value)) {
      this._ingredients.push(value);
    }
  }

  get appliances () {
    return this._appliances;
  }

  set appliances (value) {
    if (!this._appliances.includes(value)) {
      this._appliances.push(value);
    }
  }

  get ustensils () {
    return this._ustensils;
  }

  set ustensils (value) {
    if (!this._ustensils.includes(value)) {
      this._ustensils.push(value);
    }
  }

  get tagList () {
    return this._tagList;
  }

  displayTagFilter () {
    this.updateTagList();
    this.createTagFilter();
  }

  updateTagList () {
    this._tagList = [...this._ingredients, ...this._appliances, ...this._ustensils];
  }

  createTagFilter () {
    const tagsHtml = this._tagList.map(item => {
      return /* html */`
    <li class="p-4 mt-6 rounded min-w-9 bg-tanoi mr-9">
      <span class="inline mr-9">${item}</span>
      <svg class="cleanTag inline cursor-pointer" id="${item.split(' ').join('-')}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </li>
    `;
    }).join('');

    const tagList = document.querySelector('#tag-list');
    tagList.innerHTML = tagsHtml;

    const cleanTags = document.querySelectorAll('.cleanTag');
    cleanTags.forEach(tag => tag.addEventListener('click', (e) => {
      const reverseTagIdFormat = tag.id.split('-').join(' ');
      this.removeTag(reverseTagIdFormat);
    }));
  }

  removeTag (tag) {
    if (this._ingredients.includes(tag)) {
      this._ingredients = this._ingredients.filter(item => item !== tag);
    } else if (this._appliances.includes(tag)) {
      this._appliances = this._appliances.filter(item => item !== tag);
    } else if (this._ustensils.includes(tag)) {
      this._ustensils = this._ustensils.filter(item => item !== tag);
    };

    this.displayTagFilter();
    this.updateFilteredList();
    this.updateFiltersInput(this._recipeListFiltered);
    RecipesSection.generateRecipesList(this._recipeListFiltered);
  }

  removeAllTag () {
    this._ingredients = [];
    this._appliances = [];
    this._ustensils = [];
    this.displayTagFilter();
  }

  filterRecipesByIngredients (list = this.recipesList) {
    const ingredientsFilter = this._ingredients;
    const result = list.filter(function (recipe) {
      return recipe.ingredients.some(function (item) {
        return ingredientsFilter.includes(item.ingredient.toLowerCase());
      });
    });
    return result;
  }

  filterRecipesByAppliance (list = this.recipesList) {
    const appliancesToFilter = this._appliances;
    const result = list.filter(recipe => {
      return appliancesToFilter.some(appliance => appliance === recipe.appliance.toLowerCase());
    });
    return result;
  }

  filterRecipesByUstencils (list = this.recipesList) {
    const ustencilsFilter = this._ustensils;
    const result = list.filter(function (recipe) {
      return ustencilsFilter.some(function (ustensil) {
        return recipe.ustensils.includes(ustensil.toLowerCase());
      });
    });
    return result;
  }

  getParseAndFilteredListBy (typeFilter) {
    this.searchBar.cleanSearchFromTag();
    if (this._recipeListFiltered.length === 0) {
      switch (typeFilter) {
        case 'Ustensiles':
          this._recipeListFiltered = this.filterRecipesByUstencils();
          this.updateFiltersInput(this._recipeListFiltered);
          break;
        case 'Appareils':
          this._recipeListFiltered = this.filterRecipesByAppliance();
          this.updateFiltersInput(this._recipeListFiltered);
          break;
        case 'Ingrédients':
          this._recipeListFiltered = this.filterRecipesByIngredients();
          this.updateFiltersInput(this._recipeListFiltered);
          break;
        default:
          console.log('error');
      }
    } else {
      switch (typeFilter) {
        case 'Ustensiles':
          this._recipeListFiltered = this.filterRecipesByUstencils(this._recipeListFiltered);
          this.updateFiltersInput(this._recipeListFiltered);
          break;
        case 'Appareils':
          this._recipeListFiltered = this.filterRecipesByAppliance(this._recipeListFiltered);
          this.updateFiltersInput(this._recipeListFiltered);
          break;
        case 'Ingrédients':
          this._recipeListFiltered = this.filterRecipesByIngredients(this._recipeListFiltered);
          this.updateFiltersInput(this._recipeListFiltered);
          break;
        default:
          console.log('error');
      }
    }
    RecipesSection.generateRecipesList(this._recipeListFiltered);
  }

  cleanDoubleRecipes (recipeList) {
    const ids = {};
    const result = [];

    recipeList.forEach(function (recipe) {
      if (!ids[recipe.id]) {
        ids[recipe.id] = true;
        result.push(recipe);
      }
    });

    return result;
  }

  updateFiltersInput (recipeListFiltered) {
    const ingredientsList = DataList.getIngredientsList(recipeListFiltered);
    const applianceList = DataList.getApplianceList(recipeListFiltered);
    const ustensilsList = DataList.getUstensils(recipeListFiltered);
    this.ustensilsFilter.updateGenerateListToFilter(ustensilsList);
    this.applianceFilter.updateGenerateListToFilter(applianceList);
    this.ingredientFilter.updateGenerateListToFilter(ingredientsList);
  }

  updateFilteredList () {
    const resultFiltered = this.recipesList.filter(recipe => {
      const ingredientCheck = this._ingredients.every(ingredient => {
        return recipe.ingredients.some(item => item.ingredient.toLowerCase() === ingredient);
      });
      const applianceCheck = this._appliances.every(appliance => {
        return recipe.appliance.toLowerCase() === appliance;
      });
      const ustencilCheck = this._ustensils.every(ustencil => {
        return recipe.ustensils.some(item => item === ustencil);
      });
      return ingredientCheck && applianceCheck && ustencilCheck;
    });
    this._recipeListFiltered = resultFiltered;
  }
}
