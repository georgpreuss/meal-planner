const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const Recipe = require('../models/recipe')
const User = require('../models/user')

const createRecipe = async (req, res, next) => {
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return next(
	// 		new HttpError('Invalid inputs passed, please check your data.', 422)
	// 	)
	// }

	const {
		title,
		originalAuthor,
		rating,
		prepEffort,
		cookEffort,
		serves,
		image,
		description,
		ingredients,
		method,
		units,
		tags
	} = req.body

	// decode jwt and grab userId
	let user
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			throw new Error('Authentication failed!')
		}
		const decodedToken = jwt.verify(token, process.env.JWT_KEY)
		user = await User.findById(decodedToken.userId)
	} catch (err) {
		const error = new HttpError('Authentication failed!', 401)
		return next(error)
	}

	const recipe = new Recipe({
		title,
		originalAuthor,
		rating,
		prepEffort,
		cookEffort,
		serves,
		image,
		description,
		ingredients,
		units,
		method,
		tags,
		comments: [],
		creatorName: user.username,
		creatorId: user._id,
		version: 1,
		ancestors: [],
		descendants: [],
		downloadedByUser: [],
		downloadedByGroup: []
	})

	try {
		await recipe.save() // needed to create collection in db if collection doesn't exist yet
		const session = await mongoose.startSession()
		session.startTransaction()
		await recipe.save({ session })
		user.recipesCreated.push(recipe)
		await user.save({ session })
		await session.commitTransaction()
	} catch (err) {
		const error = new HttpError('Could not save recipe, please try again.', 500)
		return next(error)
	}

	// add code to immediately create local copy and save to personal recipe book?
	res.status(201).json({ recipe })
}

const getAllRecipes = async (req, res, next) => {
	let recipes
	try {
		recipes = await Recipe.find()
	} catch (err) {
		const error = new HttpError(
			'Could not retrieve recipes, please try again later.',
			500
		)
		return next(error)
	}
	if (!recipes) {
		throw new HttpError(
			'Currently there are no recipes, why not add one yourself?',
			404
		)
	}
	res.status(200).json({ recipes })
}

const getRecipeById = async (req, res, next) => {
	const recipeId = req.params.recipeId

	let recipe
	try {
		recipe = await Recipe.findById(recipeId)
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not retrieve recipe for this id.',
			500
		)
		return next(error)
	}

	res.status(200).json({ recipe })
}

const editRecipe = (req, res, next) => {
	// grab local copy
}

const deleteRecipe = (req, res, next) => {
	// delete only from personal recipe book
	// remember master creator? will it be in forked recipes in the array anyway?
	// or don't allow delete if recipe has been forked, rated, liked, etc.
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
	editRecipe,
	deleteRecipe,
	getRecipesByCreator
}
