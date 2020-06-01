const express = require('../node_modules/express')

const recipesControllers = require('../controllers/recipes-controllers')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get('/', recipesControllers.getAllRecipes)

router.get('/:recipeId', recipesControllers.getRecipeById)

router.get('/createdby/:userId', recipesControllers.getRecipesCreatedByUserId)

router.get('/savedby/:userId', recipesControllers.getRecipesSavedByUserId) // get all recipes saved by user id

router.get('/createdby/:groupId') // get all recipes in a group (optional, as very niche but maybe flat shares, joint holidays, etc.?)

router.get('/savedby/:groupId') // get all recipes in collective recipe books of your friends

router.use(checkAuth) // all routes below require authentication

router.post('/createRecipe', recipesControllers.createRecipe) // create a recipe

router.post('/createLocalCopy') // create local copy of recipe - allows users to make amendments to recipe and parameters like prep and cook times

router.put('/:recipeId', recipesControllers.editRecipe) // edit recipe

// router.put('/:localRecipeId') // edit local copy of recipe - maybe not necessary as once local copy is made that will have a different id

router.delete('/:recipeId', recipesControllers.deleteRecipe) // delete recipe - only from user's recipe book (so immediately make local copy of new recipes?)

// router.delete('/:localRecipeId') // delete recipe from personal recipe book - also maybe not necessary as once local copy is made that will have a different id

module.exports = router
