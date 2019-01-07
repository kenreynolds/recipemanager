import { getSearchFilter } from './filters';
import { getRecipes } from './recipes';
import { removeIngredient, haveIngredients, toggleIngredient } from './ingredients';

const ingredientsListEl = document.querySelector('#ingredients-list');

// Generate DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
    const cardEl = document.createElement('div');
    const cardBodyEl = document.createElement('div');
    const cardHeaderEl = document.createElement('div');
    const recipeBodyEl = document.createElement('p');
    const recipeTitleEl = document.createElement('a');

    // Add Bootswatch classes
    cardEl.classList.add('card', 'border-primary', 'mb-3');
    cardHeaderEl.classList.add('card-header');
    cardBodyEl.classList.add('card-body');
    recipeBodyEl.classList.add('card-text', 'font-weight-light', 'text-muted');

    // Setup recipe title text
    if (recipe.title.length > 0) {
        recipeTitleEl.textContent = recipe.title;
    } else {
        recipeTitleEl.textContent = 'Unnamed recipe'
    }

    // Setup recipe body text
    recipeBodyEl.textContent = haveIngredients(recipe);

    // Create card structure
    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);

    // Create card header structure
    cardHeaderEl.appendChild(recipeTitleEl);
    recipeTitleEl.setAttribute('href', `/edit.html#${recipe.id}`);

    // Create card body structure
    cardBodyEl.appendChild(recipeBodyEl);

    return cardEl;
};

// Generate DOM structure for ingredients list
const generateIngredientsDOM = (recipeId, ingredient) => {
    const checkbox = document.createElement('input');
    const ingredientEl = document.createElement('li');
    const ingredientLabel = document.createElement('label');
    const ingredientText = document.createElement('span');
    const removeButton = document.createElement('i');
    const idName = ingredient.ingredientName.toLowerCase().replace(' ', '-');

    // Set ingredient element id
    ingredientEl.id = idName;

    // Setup ingredient label
    ingredientEl.classList.add('align-items-center', 'd-flex', 'form-check', 'justify-content-between', 'mb-2');
    ingredientLabel.classList.add('form-check-label', 'd-flex', 'align-items-center');
    ingredientEl.appendChild(ingredientLabel);

    // Setup ingredient checkbox
    checkbox.classList.add('form-check-input', 'mt-0');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = ingredient.hasIngredient;
    ingredientLabel.appendChild(checkbox);

    if (checkbox.checked) {
        ingredientText.classList.add('hasIngredient');
    }

    checkbox.addEventListener('change', () => {
        toggleIngredient(ingredient)
        ingredientText.classList[ checkbox.checked ? 'add' : 'remove' ]('hasIngredient');
    });

    // Setup ingredient text
    ingredientText.textContent = ingredient.ingredientName;
    ingredientLabel.appendChild(ingredientText);

    // Setup remove button
    removeButton.classList.add('far', 'fa-times-circle');
    ingredientEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeIngredient(recipeId, ingredient.id)
        ingredientEl.remove();
    });

    return ingredientEl;
};

const initializeEditPage = (recipeId) => {
    const bodyEl = document.querySelector('#recipe-body');
    const titleEl = document.querySelector('#recipe-title');

    // Get individual recipe
    const recipes = getRecipes();
    const recipe = recipes.find((recipe) => recipe.id === recipeId);

    if (!recipe) {
        location.assign('/index.html');
    }

    bodyEl.value = recipe.body;
    titleEl.value = recipe.title;

    renderIngredients(recipeId)
};

// Render ingredients
const renderIngredients = (recipeId) => {
    const recipes = getRecipes();
    const recipe = recipes.find(recipe => recipe.id === recipeId);

    ingredientsListEl.innerHTML = '';

    recipe.ingredients.forEach((ingredient) => {
        const ingredientEl = generateIngredientsDOM(recipe.id, ingredient);
        ingredientsListEl.appendChild(ingredientEl);
    });
};

// Render recipes
const renderRecipes = () => {
    // Get page elements from DOM
    const recipesEl = document.querySelector('#recipes');

    const filter = getSearchFilter();
    const recipes = getRecipes();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(filter.toLowerCase())
    );

    recipesEl.innerHTML = '';

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeElement = generateRecipeDOM(recipe);
            recipesEl.appendChild(recipeElement);
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No recipes to show';
        recipesEl.appendChild(emptyMessage);
    }
};

export {
    initializeEditPage,
    renderIngredients,
    renderRecipes
}