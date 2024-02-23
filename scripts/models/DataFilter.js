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
  }

  setFilters (ustensilsFilter, applianceFilter, ingredientFilter) {
    this.ustensilsFilter = ustensilsFilter;
    this.applianceFilter = applianceFilter;
    this.ingredientFilter = ingredientFilter;
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

  displayTagFilter () {
    this.updateTagList();
    this.createTagFilter();
  }

  updateTagList () {
    this._tagList = [];
    let i = 0;
    // Boucle while pour itérer sur les ingrédients
    while (i < this._ingredients.length) {
      this._tagList.push(this._ingredients[i]);
      i++;
    }
    let j = 0;
    // Boucle while pour itérer sur les appareils
    while (j < this._appliances.length) {
      this._tagList.push(this._appliances[j]);
      j++;
    }
    let k = 0;
    // Boucle while pour itérer sur les ustensiles
    while (k < this._ustensils.length) {
      this._tagList.push(this._ustensils[k]);
      k++;
    }
  }

  // Méthode pour filtrer les recettes par ingrédients
  filterRecipesByIngredients (list = this.recipesList) {
    const ingredientsFilter = this._ingredients;
    const result = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].ingredients.length; j++) {
        if (ingredientsFilter.includes(list[i].ingredients[j].ingredient.toLowerCase())) {
          result.push(list[i]);
          break;
        }
      }
    }
    return result;
  }

  // Méthode pour filtrer les recettes par appareils
  filterRecipesByAppliance (list = this.recipesList) {
    const appliancesToFilter = this._appliances;
    const result = [];
    for (let i = 0; i < list.length; i++) {
      if (appliancesToFilter.includes(list[i].appliance.toLowerCase())) {
        result.push(list[i]);
      }
    }
    return result;
  }

  // Méthode pour filtrer les recettes par ustensiles
  filterRecipesByUstencils (list = this.recipesList) {
    const ustencilsFilter = this._ustensils;
    const result = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].ustensils.length; j++) {
        if (ustencilsFilter.includes(list[i].ustensils[j].toLowerCase())) {
          result.push(list[i]);
          break;
        }
      }
    }
    return result;
  }

  // Méthode pour obtenir et filtrer la liste
  getParseAndFilteredListBy (typeFilter) {
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

  // Méthode pour supprimer un tag
  removeTag (tag) {
  // Vérifie si le tag est présent dans les ingrédients
    let foundInIngredients = false;
    let i = 0;
    while (i < this._ingredients.length) {
      if (this._ingredients[i] === tag) {
        this._ingredients.splice(i, 1); // Supprime le tag trouvé
        foundInIngredients = true;
        break; // Sort de la boucle car le tag est trouvé et supprimé
      }
      i++;
    }

    // Vérifie si le tag est présent dans les appareils
    if (!foundInIngredients) {
      let foundInAppliances = false;
      let j = 0;
      while (j < this._appliances.length) {
        if (this._appliances[j] === tag) {
          this._appliances.splice(j, 1); // Supprime le tag trouvé
          foundInAppliances = true;
          break; // Sort de la boucle car le tag est trouvé et supprimé
        }
        j++;
      }

      // Vérifie si le tag est présent dans les ustensiles
      if (!foundInAppliances) {
        let k = 0;
        while (k < this._ustensils.length) {
          if (this._ustensils[k] === tag) {
            this._ustensils.splice(k, 1); // Supprime le tag trouvé
            break; // Sort de la boucle car le tag est trouvé et supprimé
          }
          k++;
        }
      }
    }

    // Mise à jour de l'affichage des filtres de tag
    this.displayTagFilter();
    // Met à jour la liste filtrée des recettes
    this.updateFilteredList();
    // Met à jour les filtres d'entrée
    this.updateFiltersInput(this._recipeListFiltered);
    // Génère la liste de recettes à afficher
    RecipesSection.generateRecipesList(this._recipeListFiltered);
  }

  // Méthode pour supprimer les recettes en double
  cleanDoubleRecipes (recipeList) {
    const ids = {};
    const result = [];
    for (let i = 0; i < recipeList.length; i++) {
      if (!ids[recipeList[i].id]) {
        ids[recipeList[i].id] = true;
        result.push(recipeList[i]);
      }
    }
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

  // Méthode pour mettre à jour la liste filtrée des recettes
  updateFilteredList () {
    const resultFiltered = [];
    // Boucle sur chaque recette dans la liste des recettes
    for (let i = 0; i < this.recipesList.length; i++) {
      const recipe = this.recipesList[i];
      let ingredientCheck = true;
      let applianceCheck = true;
      let ustensilCheck = true;

      // Vérifie si tous les ingrédients sélectionnés sont présents dans la recette
      for (let j = 0; j < this._ingredients.length; j++) {
        const ingredient = this._ingredients[j];
        let ingredientFound = false;
        // Boucle sur chaque ingrédient de la recette
        for (let k = 0; k < recipe.ingredients.length; k++) {
          if (recipe.ingredients[k].ingredient.toLowerCase() === ingredient) {
            ingredientFound = true;
            break; // Sort de la boucle si l'ingrédient est trouvé
          }
        }
        if (!ingredientFound) {
          ingredientCheck = false;
          break; // Sort de la boucle si un ingrédient n'est pas trouvé
        }
      }

      // Vérifie si l'appareil sélectionné correspond à l'appareil de la recette
      if (this._appliances.length > 0 && !this._appliances.includes(recipe.appliance.toLowerCase())) {
        applianceCheck = false;
      }

      // Vérifie si tous les ustensiles sélectionnés sont présents dans la recette
      for (let l = 0; l < this._ustensils.length; l++) {
        const ustensil = this._ustensils[l];
        let ustensilFound = false;
        // Boucle sur chaque ustensile de la recette
        for (let m = 0; m < recipe.ustensils.length; m++) {
          if (recipe.ustensils[m].toLowerCase() === ustensil) {
            ustensilFound = true;
            break; // Sort de la boucle si l'ustensile est trouvé
          }
        }
        if (!ustensilFound) {
          ustensilCheck = false;
          break; // Sort de la boucle si un ustensile n'est pas trouvé
        }
      }

      // Si toutes les conditions sont satisfaites, ajoute la recette à la liste filtrée
      if (ingredientCheck && applianceCheck && ustensilCheck) {
        resultFiltered.push(recipe);
      }
    }

    // Met à jour la liste filtrée des recettes
    this._recipeListFiltered = resultFiltered;
  }
}
