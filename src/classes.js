class Ingredient {
    constructor(id, ingredientName, hasIngredient) {
        this.id = id,
        this.ingredientName = ingredientName,
        this.hasIngredient = hasIngredient
    }
}

class Recipe {
    constructor(id, body, createdAt, ingredients, title, updatedAt) {
        this.id = id,
        this.body = body,
        this.createdAt = createdAt,
        this.ingredients = ingredients,
        this.title = title
        this.updatedAt = updatedAt
    }
}

export { Ingredient, Recipe }