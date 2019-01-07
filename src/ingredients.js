import uuidv4 from 'uuid/v4';
import { getRecipes, saveRecipes } from './recipes';
import { Ingredient } from './classes';

const recipes = getRecipes();

const addIngredient = (recipeId, ingredientName) => {
    const id = uuidv4();
    const newIngredient = new Ingredient(id, ingredientName, false);
    const recipe = recipes.find(recipe => recipe.id === recipeId);

    recipe.ingredients.push(newIngredient);
    saveRecipes()
};

const haveIngredients = (recipe) => {
    let qty = 'have some'
    const noIngredients = recipe.ingredients.every((ingredient) => ingredient.hasIngredient === false);
    const allIngredients = recipe.ingredients.every((ingredient) => ingredient.hasIngredient === true);

    if (noIngredients) {
        qty = 'don\'t have any';
    } else if (allIngredients) {
        qty = 'have all';
    }

    return `You ${qty} of the ingredients`;
};

const removeIngredient = (recipeId, ingredientId) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === recipeId);
    const ingredientIndex = recipes[recipeIndex].ingredients.findIndex((ingredient) => ingredient.id === ingredientId);

    if (recipeIndex > -1 && ingredientIndex > -1) {
        recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
        saveRecipes()
    }
};

const toggleIngredient = (ingredient) => {
    if (ingredient.hasIngredient) {
        ingredient.hasIngredient = false;
    } else {
        ingredient.hasIngredient = true;
    }

    saveRecipes()
};

export { addIngredient, haveIngredients, removeIngredient, toggleIngredient }