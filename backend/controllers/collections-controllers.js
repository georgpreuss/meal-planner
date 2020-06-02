// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const Collection = require('../models/collection')

const saveToCollection = async (req, res, next) => {
	console.log('is this on?')
	const { test } = req.body

	const localCopy = new Collection({
		test
	})

	try {
		await localCopy.save()
	} catch (err) {
		const error = new HttpError(
			'Could not save to collection, please try again.',
			500
		)
		return next(error)
	}

	res.status(201).json({ localCopy })
}

const getAllRecipes = async (req, res, next) => {
	// is this endpoint strictly necessary?
	let recipes
	try {
		recipes = await Collection.find()
	} catch (err) {
		const error = new HttpError(
			'Could not retrieve recipes stored in collections, please try again later.',
			500
		)
		return next(error)
	}
	if (!recipes) {
		throw new HttpError(
			'Currently there are no recipes stored in any collections, why not add one yourself?',
			404
		)
	}
	res.status(200).json({ recipes })
}

const getRecipeCopyById = (req, res, next) => {
	console.log('is this on?')
}

const editRecipeCopy = (req, res, next) => {
	console.log('it this on?')
}

const deleteRecipeCopy = (req, res, next) => {
	console.log('is this on?')
}

const getCollectionByUserId = (req, res, next) => {
	console.log('is this on?')
}

module.exports = {
	saveToCollection,
	getAllRecipes,
	getRecipeCopyById,
	editRecipeCopy,
	deleteRecipeCopy,
	getCollectionByUserId
}
