import RecipeCard from './RecipeCard.js';

export default class RecipesSection {
  static generateRecipesList (list) {
    const recipeList = document.querySelector('#recipesList');
    recipeList.innerHTML = '';
    list.forEach(recipe => {
      const recipeCard = new RecipeCard(recipe);
      recipeList.appendChild(recipeCard.createRecipeCard());
    });
  }
}
