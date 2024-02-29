import RecipesSection from '../templates/RecipesSection';

export default class DataSearchBarFilter {
  constructor (listToFilter, dataFilter) {
    this.listToFilter = listToFilter;
    this.dataFilter = dataFilter;
    this.searchBarBtn = document.querySelector('#search-bar-input-btn');
    this.cleanSearchBarBtn = document.querySelector('#clean-search-bar-btn');
    this.searchBar = document.querySelector('#search-bar-input');

    this.searchBar.addEventListener('input', (e) => {
      if (e.target.value.length > 0) {
        this.cleanSearchBarBtn.classList.remove('hidden');
      } else {
        this.cleanSearchBarBtn.classList.add('hidden');
      }
    });

    this.searchBarBtn.addEventListener('click', (e) => {
      if (this.searchBar.value.length >= 3) {
        this.findMatches(this.searchBar.value);
        this.dataFilter.removeAllTag();
      } else {
        RecipesSection.generateRecipesList(this.listToFilter);
      }
    });

    this.searchBar.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.searchBar.value.length >= 3) {
        e.preventDefault();
        this.findMatches(this.searchBar.value);
        this.dataFilter.removeAllTag();
      } else {
        RecipesSection.generateRecipesList(this.listToFilter);
      }
    });

    this.cleanSearchBarBtn.addEventListener('click', (e) => this.cleanSearch());
  }

  findMatches (wordToMatch) {
    const list = this.listToFilter;
    const recipesNotFound = document.querySelector('#recipesNotFound');
    const ingredientFind = this.filterRecipesByIngredients(list, wordToMatch);
    const titleFind = this.filterRecipesByNames(list, wordToMatch);
    const descriptionFind = this.filterRecipesByDescription(list, wordToMatch);
    const result = this.cleanDoubleRecipes([...ingredientFind, ...titleFind, ...descriptionFind]);
    if (result.length > 0) {
      RecipesSection.generateRecipesList(result);
      this.dataFilter.updateFiltersInput(result);
    } else {
      RecipesSection.generateRecipesList(result);
      this.dataFilter.updateFiltersInput(result);
      recipesNotFound.classList.remove('hidden');
    }
  }

  filterRecipesByIngredients (list, wordToMatch) {
    const regex = new RegExp(wordToMatch, 'gi');
    const result = list.filter(function (recipe) {
      return recipe.ingredients.some(function (item) {
        return item.ingredient.toLowerCase().match(regex);
      });
    });
    return result;
  }

  filterRecipesByNames (list, wordToMatch) {
    const regex = new RegExp(wordToMatch, 'gi');
    const result = list.filter(recipe => recipe.name.toLowerCase().match(regex));
    return result;
  }

  filterRecipesByDescription (list, wordToMatch) {
    const regex = new RegExp(wordToMatch, 'gi');
    const result = list.filter(recipe => recipe.description.toLowerCase().match(regex));
    return result;
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

  cleanSearch () {
    const recipesNotFound = document.querySelector('#recipesNotFound');
    recipesNotFound.classList.add('hidden');
    this.searchBar.value = '';
    this.cleanSearchBarBtn.classList.add('hidden');
    RecipesSection.generateRecipesList(this.listToFilter);
    this.dataFilter.updateFiltersInput(this.listToFilter);
  }

  cleanSearchFromTag () {
    this.searchBar.value = '';
    this.cleanSearchBarBtn.classList.add('hidden');
  }
}
