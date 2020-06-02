const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const Recipe = require('../models/recipe')
const User = require('../models/user')

// const createRecipeTest = (req, res, next) => {
//   const userId = req.currentUser._id
//   const { userSettings} = req.body
//   userSettings[0].userId = userId
//   User.findById(userId).then()

// }

const createRecipe = async (req, res, next) => {
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return next(
	// 		new HttpError('Invalid inputs passed, please check your data.', 422)
	// 	)
	// }
	const userId = req.currentUser._id

	let user
	try {
		user = await User.findById(userId)
	} catch (err) {
		const error = new HttpError('Authentication failed!', 401)
		return next(error)
	}

	const { userSettings } = req.body

	userSettings[0].userId = userId // bit of a hack?

	const recipe = new Recipe({
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

	try {
		await recipe.save() // needed to create collection in db if collection doesn't exist yet?
		const session = await mongoose.startSession()
		session.startTransaction()
		await recipe.save({ session })
		user.recipesCreated.push(recipe)
		user.recipeCollection.push(recipe)
		await user.save({ session })
		await session.commitTransaction()
	} catch (err) {
		const error = new HttpError('Could not save recipe, please try again.', 500)
		return next(error)
	}

	res.status(201).json({ recipe })
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

const editRecipe = (req, res, next) => {
	// copy recipe document into new one which can be edited
	// version plus 1
	// add parentId into ancestors array of new document
	// add childId into descendants array of parent document
}

const deleteRecipe = (req, res, next) => {
	// only allow delete if recipe.downloadedByUser is empty && recipe.descendants is empty
}

const getRecipesByCreator = async (req, res, next) => {
	const creatorId = req.params.creatorId

	let recipes
	try {
		recipes = await Recipe.find({ creatorId })
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not retrieve recipes for this user id.'
		)
		return next(error)
	}
	res.status(200).json({ recipes })
}

module.exports = {
	createRecipe,
	getAllRecipes,
	getRecipeById,
	editRecipeSettings,
	editRecipe,
	deleteRecipe,
	getRecipesByCreator
}
