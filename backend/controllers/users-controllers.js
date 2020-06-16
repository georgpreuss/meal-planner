// const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')

const User = require('../models/user')
const Recipe = require('../models/recipe')
const { port } = require('../config/environment')

const checkAvailable = (req, res, next) => {
	const { username } = req.body
	User.findOne({ username })
		.then((user) => {
			// console.log(!user)
			if (user) {
				return res
					.status(201)
					.json({ message: 'This username is unavailable, please try another' })
			}
		})
		.catch((error) => res.status(500).json(error))
}

const signup = (req, res, next) => {
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	console.log('errors: ', errors.errors)
	// 	return res.status(500).json(errors)
	// }
	User.create({
		...req.body,
		image: 'we',
		units: 'metric',
		resetPasswordToken: '',
		resetPasswordExpires: null
	}) // change later
		.then((user) => {
			const token = jwt.sign({ sub: user._id }, process.env.JWT_KEY, {
				expiresIn: '12h'
			})
			res
				.status(201)
				.json({ message: 'Registration successful', id: user._id, token })
		})
		.catch((error) => res.status(500).json(error))
}

const login = (req, res, next) => {
	const { email, password } = req.body
	User.findOne({ email })
		.then((user) => {
			if (!user || !user.validatePassword(password)) {
				return res.status(401).json({ message: 'Unauthorized 1' })
			}
			const token = jwt.sign({ sub: user._id }, process.env.JWT_KEY, {
				expiresIn: '12h'
			})
			res.status(202).json({ id: user._id, token })
		})
		.catch(() => res.status(401).json({ message: 'Unauthorized 2' }))
}

const getProfile = (req, res, next) => {
	User.findById(req.params.userId, '-password') // how do you exclude multiple items - currently email is still included
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(500).json(error))
}

const changeProfile = (req, res, next) => {
	User.findById(req.params.userId)
		.then((user) =>
			!user
				? res.status(404).json({ message: '404 not found' })
				: user.set(req.body)
		)
		.then((user) => user.save())
		.then((user) => res.status(202).json(user))
		.catch((error) => res.status(500).json(error))
}

// OPTIONAL
const deleteAccount = (req, res, next) => {}

// credit https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7
const forgotPassword = (req, res, next) => {
	const { email } = req.body
	!email
		? res.status(400).json({ message: 'Email required' })
		: User.findOne({ email }).then((user) => {
				console.log(user)
				if (!user) {
					res.status(403).json({ message: 'This email is not in our database' })
				} else {
					// do I need to use crypto instead of jwt?
					const token = jwt.sign({ sub: user._id }, process.env.JWT_KEY, {
						expiresIn: '1h'
					})
					console.log('token: ', token)
					user.update({
						resetPasswordToken: token,
						resetPasswordExpires: Date.now() + 3600000
					})
					const mailProvider = nodemailer.createTransport({
						service: 'gmail',
						auth: {
							user: process.env.EMAIL_ADDRESS,
							password: process.env.EMAIL_PASSWORD
						}
					})
					const mailOptions = {
						from: process.env.EMAIL_ADDRESS,
						to: user.email,
						subject: 'Link To Reset Password',
						text: `
            We heard that you lost your MEAL-PLANNER password. Sorry about that!

            But don't worry! You can use the following link to reset your password:

            http://localhost:${port}/api/users/reset${token}

            If you did not request this, please ignore this email and your password will remain unchanged.
            
            This link will expire within 1 hour. To get a new password reset link, visit XXXXX

            Thanks,
            MEAL-PLANNER Team
            `
					}
					console.log('sending email')

					// console.log('mailProvider: ', mailProvider.options.auth)
					// mailProvider.sendMail(mailOptions, (err, response) => {
					// 	if (err) {
					// 		console.log('An error has occured: ', err)
					// 	} else {
					// 		{
					// 			console.log('Response: ', response)
					// 		}
					// 		res.status(200).json({ message: 'Password reset link sent' })
					// 	}
					// })
				}
		  })
}

const saveToCollection = (req, res, next) => {
	const userId = req.currentUser._id
	const { recipeId } = req.body
	console.log(userId)
	console.log(recipeId)
	let user
	let recipe
	let session = null // does it need to be initialised as null?
	User.findById(userId)
		.then((u) => (user = u))
		.then(() => {
			Recipe.findById(recipeId).then((r) => {
				console.log('user: ', user)
				console.log('r: ', r)
				recipe = r
				console.log('recipe1: ', recipe)
				if (user.recipeCollection.includes(recipeId)) {
					return res
						.status(400)
						.json({ message: 'this recipe already is in your collection' })
				} else {
					mongoose
						.startSession()
						.then((_session) => {
							session = _session
							session.startTransaction()
							user.recipeCollection.push(recipeId)
							user.save({ session })
							// to not add duplicates to downloadedBy array
							if (!recipe.downloadedByUser.includes(userId)) {
								recipe.downloadedByUser.push(userId)
							}
							recipe.save({ session })
							session.commitTransaction()
						})
						.then(() =>
							res.status(201).json({
								message: 'recipe added to collection',
								collection: user.recipeCollection
							})
						)
						.catch((error) => res.status(500).json(error))
				}
			})
		})
		.then(() => console.log('user: ', user, 'recipe2: ', recipe))
		.catch((error) => res.status(500).json(error))
}

const removeFromCollection = (req, res, next) => {
	const userId = req.currentUser._id
	const { recipeId } = req.body
	let user
	let recipe
	let session = null // does it need to be initialised as null?
	User.findById(userId)
		.then((u) => (user = u))
		.then(() => {
			Recipe.findById(recipeId).then((r) => {
				recipe = r
				if (!user.recipeCollection.includes(recipeId)) {
					return res
						.status(400)
						.json({ message: 'could not find this recipe in your collection' })
				} else {
					mongoose
						.startSession()
						.then((_session) => {
							session = _session
							session.startTransaction()
							const index = user.recipeCollection.indexOf(recipeId)
							user.recipeCollection.splice(index, 1)
							user.save({ session })
							if (recipe.downloadedByUser.includes(userId)) {
								const index = recipe.downloadedByUser.indexOf(userId)
								recipe.downloadedByUser.splice(index, 1)
							}
							recipe.save({ session })
							session.commitTransaction()
						})
						.then(() =>
							res
								.status(202)
								.json({ message: 'recipe removed from your collection' })
						)
						.catch((error) => res.status(500).json(error))
				}
			})
		})
		.then(() => console.log('user: ', user, 'recipe2: ', recipe))
		.catch((error) => res.status(500).json(error))
}

module.exports = {
	checkAvailable,
	signup,
	login,
	getProfile,
	changeProfile,
	deleteAccount,
	forgotPassword,
	saveToCollection,
	removeFromCollection
}
