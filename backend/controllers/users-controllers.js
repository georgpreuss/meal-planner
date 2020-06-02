const { validationResult } = require('../node_modules/express-validator/src')
const jwt = require('../node_modules/jsonwebtoken')
const bcrypt = require('bcrypt')

const HttpError = require('../models/http-error')
const User = require('../models/user')

const signup = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return next(
			new HttpError('Invalid inputs passed, please check your data.', 422)
		)
	}

	const { username, email, password } = req.body

	let existingUser

	try {
		existingUser = await User.findOne({ email }) // does this also ensure collection is started in db?
	} catch (err) {
		const error = new HttpError('Signup failed, please try again', 500)
		return next(error)
	}

	if (existingUser) {
		const error = new HttpError('Signup failed, please try again', 422)
		return next(error)
	}

	let hashedPassword
	try {
		hashedPassword = await bcrypt.hash(password, 12)
	} catch (err) {
		const error = new HttpError('Could not create user, please try again.', 500)
		return next(error)
	}

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
		image: 'www.google.com', // change this later
		recipesCreated: []
	})

	try {
		await newUser.save()
	} catch (err) {
		const error = new HttpError('Signup failed, please try again later.', 500)
		return next(error)
	}

	let token
	try {
		token = jwt.sign(
			{ userId: newUser.id, email: newUser.email },
			process.env.JWT_KEY,
			{
				expiresIn: '12h'
			}
		)
	} catch (err) {
		const error = new HttpError('Signup failed, please try again later.', 500)
		return next(error)
	}

	res.status(201).json({
		message: 'Signup successful',
		userId: newUser.id,
		email: newUser.email,
		token
	})
}

const login = async (req, res, next) => {
	const { email, password } = req.body

	let existingUser
	try {
		existingUser = await User.findOne({ email })
	} catch (err) {
		const error = new HttpError(
			'Login failed. This could be because you entered invalid credentials or you do not yet have an account.',
			500
		)
		return next(error)
	}

	if (!existingUser) {
		const error = new HttpError(
			'Login failed. This could be because you entered invalid credentials or you do not yet have an account.',
			401
		)
		return next(error)
	}

	let isValidPassword = false

	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password)
	} catch (err) {
		const error = new HttpError(
			'Could not log you in, please check your credentials and try again.',
			500
		)
		return next(error)
	}

	if (!isValidPassword) {
		const error = new HttpError(
			'Login failed. This could be because you entered invalid credentials or you do not yet have an account.',
			401
		)
		return next(error)
	}

	let token
	try {
		token = jwt.sign(
			{ userId: existingUser.id, email: existingUser.email },
			process.env.JWT_KEY,
			{ expiresIn: '12h' }
		)
	} catch (err) {
		const error = new HttpError('Login failed, please try again later.', 500)
		return next(error)
	}

	res.json({ message: 'Login successful!', id: existingUser.id, email, token })
}

const logout = async (req, res, next) => {}

const deleteAccount = async (req, res, next) => {}

module.exports = { signup, login, logout, deleteAccount }
