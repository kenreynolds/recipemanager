import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { Recipe } from './classes';

let recipes = [];

// Create a new recipe
const addRecipe = () => {
    const id = uuidv4();
    const timestamp = moment().valueOf();

    const newRecipe = new Recipe (
        id,
        '',
        timestamp,
        [],
        '',
        timestamp
    );

    recipes.push(newRecipe);
    saveRecipes();
    return id;
};

// Fetch existing recipes from localStorage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes');
    try {
        recipes = recipesJSON ? JSON.parse(recipesJSON) : [];
    } catch (e) {
        recipes = [];
    }
};

// Remove a recipe from the list
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1);
        saveRecipes();
    }
};

// Save recipes to localStorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

const sortRecipes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return recipes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'byCreated') {
        return recipes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'alphabetical') {
        return recipes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        return recipes;
    }
};

const updateRecipe = (id, updates) => {
    const recipe = recipes.find(recipe => recipe.id === id)

    if (!recipe) {
        return;
    }

    if (typeof updates.title === 'string') {
        const title = updates.title.trim();

        recipe.title = title;
        recipe.updatedAt = moment().valueOf();
    }

    if (typeof updates.body === 'string') {
        const body = updates.body.trim();

        recipe.body = body;
        recipe.updatedAt = moment().valueOf();
    }

    saveRecipes();
};

// Expose recipes from module
const getRecipes = () => recipes;

loadRecipes();

export {
    addRecipe,
    getRecipes,
    loadRecipes,
    removeRecipe,
    saveRecipes,
    sortRecipes,
    updateRecipe
}