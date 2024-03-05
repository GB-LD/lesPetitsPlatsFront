export default class RecipeCard {
  constructor (recipe) {
    this.id = recipe.id;
    this.title = recipe.name;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.time = recipe.time;
    this.servings = recipe.servings;
    this.ustensils = recipe.ustensils;
    this.ingredients = recipe.ingredients;
    this.imageName = recipe.image;
    this.recipeCard = document.createElement('li');
    this.recipeCard.classList.add('w-content', 'bg-white', 'rounded-lg');
  }

  createRecipeCard () {
    const imgPath = `medias/recettes/${this.imageName}`;
    const ingredientsList = this.ingredients.map(item =>
    /* html */`
    <li>
    <p class="font-medium font-manrope">${item.ingredient}</p>
    <span class="font-manrope">${item.quantity ? item.quantity : ''} ${item.unit ? item.unit : ''}</span>
    </li>
    `

    ).join('');
    const cardContent =
    /* html */`
    <img 
    src="${imgPath}"
    alt="Photographie de ${this.title}"
    class="object-cover rounded-tl-lg rounded-tr-lg w-80 lg:w-96 h-64"
    loading="lazy">
    <article class="px-6 pt-8 pb-16 w-80 lg:w-96">
      <h2 class="mb-8 text-lg font-normal font-anton tracking-wide">${this.title}</h2>
      <h3 class="mb-8 font-bold uppercase font-manrope tracking-wide">Recette</h3>
      <p class="mb-8 font-manrope line-clamp-4">${this.description}</p>
      <h3 class="mb-8 font-bold uppercase font-manrope tracking-wide">Ingredients</h3>
      <ul class="grid grid-cols-2 gap-5">${ingredientsList}</ul>
    </article>
    `;

    this.recipeCard.innerHTML = cardContent;
    return this.recipeCard;
  }
}
