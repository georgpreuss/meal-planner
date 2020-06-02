const express = require('express')

const recipesControllers = require('../controllers/recipes-controllers')
const secureRoute = require('../middleware/check-auth')

const router = express.Router()

router
	.route('/')
	.post(secureRoute, recipesControllers.createRecipe)
	.get(recipesControllers.getAllRecipes)

router
	.route('/:recipeId')
	.get(recipesControllers.getRecipeById)
	.put(secureRoute, recipesControllers.editRecipe)
	.delete(secureRoute, recipesControllers.deleteRecipe) // delete recipe - only from user's recipe book (so immediately make local copy of new recipes?)

router.get('/creator/:creatorId', recipesControllers.getRecipesByCreator) // either individual or group collab

module.exports = router
