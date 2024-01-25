export default class DataList {
  static getIngredientsList (recipesList) {
    const ingredientsList = [];
    recipesList.forEach(recipe => {
      recipe.ingredients.forEach(item => {
        if (!ingredientsList.includes(item)) {
          ingredientsList.push(item.ingredient);
        }
      });
    });
    return ingredientsList;
  }

  static getApplianceList (recipesList) {
    const applianceList = [];
    recipesList.forEach(recipe => {
      if (!applianceList.includes(recipe.appliance)) {
        applianceList.push(recipe.appliance);
      }
    });
    return applianceList;
  }

  static getUstensils (recipesList) {
    const ustensilsList = [];
    recipesList.forEach(recipe => {
      recipe.ustensils.forEach(item => {
        if (!ustensilsList.includes(item)) {
          ustensilsList.push(item);
        }
      });
    });
    return ustensilsList;
  }
}
