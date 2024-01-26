export default class DataList {
  static getIngredientsList (recipesList) {
    const ingredientsList = [];
    recipesList.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
        if (!ingredientsList.includes(lowerCaseIngredient)) {
          ingredientsList.push(lowerCaseIngredient);
        }
      });
    });
    return ingredientsList;
  }

  static getApplianceList (recipesList) {
    const applianceList = [];
    recipesList.forEach(recipe => {
      const lowerCaseAppliance = recipe.appliance.toLowerCase();
      if (!applianceList.includes(lowerCaseAppliance)) {
        applianceList.push(lowerCaseAppliance);
      }
    });
    return applianceList;
  }

  static getUstensils (recipesList) {
    const ustensilsList = [];
    recipesList.forEach(recipe => {
      recipe.ustensils.forEach(item => {
        const lowerCaseUstensils = item.toLowerCase();
        if (!ustensilsList.includes(lowerCaseUstensils)) {
          ustensilsList.push(lowerCaseUstensils);
        }
      });
    });
    return ustensilsList;
  }
}
