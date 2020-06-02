const express = require('express')

const collectionsControllers = require('../controllers/collections-controllers')
const secureRoute = require('../middleware/check-auth')

const router = express.Router()

router
	.route('/')
	.post(secureRoute, collectionsControllers.saveToCollection)
	.get(collectionsControllers.getAllRecipes) // to get all recipes in all collections - unique set? or just don't bother with this endpoint?

router
	.route('/:recipeCopyId')
	.get(collectionsControllers.getRecipeCopyById)
	.put(secureRoute, collectionsControllers.editRecipeCopy)
	.delete(secureRoute, collectionsControllers.deleteRecipeCopy)

router.get('/collector/:userId', collectionsControllers.getCollectionByUserId)

module.exports = router
