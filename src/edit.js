import { loadRecipes, removeRecipe, updateRecipe } from './recipes';
import { addIngredient } from './ingredients';
import { initializeEditPage, renderIngredients } from './views';

// Get page elements from DOM
const ingredientButton = document.querySelector('#new-ingredient');
const bodyEl = document.querySelector('#recipe-body');
const deleteButton = document.querySelector('#delete-recipe');
const titleEl = document.querySelector('#recipe-title');

const recipeId = location.hash.substring(1);

initializeEditPage(recipeId)

bodyEl.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        body: e.target.value
    })
});

deleteButton.addEventListener('click', () => {
    removeRecipe(recipeId)
    location.assign('/index.html')
});

ingredientButton.addEventListener('click', () => {
    let ingredientEl = document.querySelector('#ingredient-input').value.trim();

    if (ingredientEl !== '') {
        const ingredientName = ingredientEl;

        addIngredient(recipeId, ingredientName)
        renderIngredients(recipeId)

        document.querySelector('#ingredient-input').value = '';
    }
});

titleEl.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
});

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        initializeEditPage(recipeId)
    }
});