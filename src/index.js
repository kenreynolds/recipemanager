import { setSearchFilter } from './filters';
import { addRecipe, loadRecipes } from './recipes';
import { renderRecipes } from './views';

// Get page elements from DOM
const addRecipeButton = document.querySelector('#add-recipe');
const searchEl = document.querySelector('#search-text');

renderRecipes()

addRecipeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const id = addRecipe();
    location.assign(`/edit.html#${id}`)
});

searchEl.addEventListener('input', (e) => {
    setSearchFilter(e.target.value)
    renderRecipes()
});

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        renderRecipes()
    }
});