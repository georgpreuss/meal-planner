const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const Recipe = require('../models/recipe')
const User = require('../models/user')

const createRecipe = (req, res, next) => {
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return next(
	// 		new HttpError('Invalid inputs passed, please check your data.', 422)
	// 	)
	// }
	const userId = req.currentUser._id
	const { userSettings } = req.body
	userSettings[0].userId = userId
	const newRecipe = new Recipe({
		...req.body,
		comments: [],
		// creatorName: user.username, // remove or add logic to ensure this updates when username gets changed
		creatorId: userId,
		version: 1,
		ancestors: [],
		descendants: [],
		downloadedByUser: [],
		downloadedByGroup: []
	})
	let user
	let session = null
	User.findById(userId)
		.then((userDocument) => {
			user = userDocument
		})
		.then(() => mongoose.startSession())
		.then((_session) => {
			session = _session
			session.startTransaction()
			newRecipe.save({ session })
			user.recipesCreated.push(newRecipe._id)
			user.recipeCollection.push(newRecipe._id)
			user.save({ session })
		})
		.then(() => session.commitTransaction())
		.then(() => res.status(201).json({ newRecipe, user }))
		.catch((err) => res.status(500).json({ error: err }))
}

const getAllRecipes = (req, res, next) => {
	Recipe.find()
		.then((recipe) => {
			!recipe
				? res
						.status(404)
						.json({ message: 'No recipes found, why not add one yourself?' })
				: res.status(200).json(recipe)
		})
		.catch((err) => res.status(400).json({ error: err }))
}

const getRecipeById = (req, res, next) => {
	Recipe.findById(req.params.recipeId)
		.then((recipe) => res.status(200).json(recipe))
		.catch((err) => res.status(500).json({ error: err }))
}

const editRecipeSettings = async (req, res, next) => {
	// console.log('req.body.user: ', req.body.user)
	console.log('req.currentUser: ', req.currentUser)
	const recipeId = req.params.recipeId
	// TODO find userSettings that match userId
	const { score, prepEffort, cookEffort, serves, images } = req.body

	let recipe
	try {
		recipe = await Recipe.findById(recipeId, (err, recipe) => {
			// console.log(recipe.userSettings.id('5ed66e18171102897e8a8963')) // this works
			console.log(recipe.userSettings)
		})
		// console.log(recipe)
		// recipe.userSettings.id({ userId: req.currentUser })
	} catch (err) {
		const error = new HttpError('Could not find recipe for this id', 500)
		return next(error)
	}

	res.status(201).json({ message: 'edits made successfully', recipe })
}

const improveRecipe = (req, res, next) => {
	// copy recipe document into new one which can be edited
	// version plus 1
	// add parentId into ancestors array of new document
	// add childId into descendants array of parent document
}

const deleteRecipe = (req, res, next) => {
	// only allow delete if recipe.downloadedByUser is empty && recipe.descendants is empty
}

const getRecipesByCreator = (req, res, next) => {
	Recipe.find({ creatorId: req.params.creatorId })
		.then((recipes) => res.status(200).json(recipes))
		.catch((err) => res.status(500).json({ error: err }))
}

module.exports = {
	createRecipe,
	getAllRecipes,
	getRecipeById,
	editRecipeSettings,
	improveRecipe,
	deleteRecipe,
	getRecipesByCreator
}
