const { v4: uuid } = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')

const DUMMY_USERS = [
	{
		username: 'name',
		email: 'name@email.com',
		password: 'password',
		id: 'u1'
	}
]

const signup = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		console.log(errors)
		throw new HttpError('Invalid inputs passed, please check your data.', 422)
	}

	const { username, email, password } = req.body

	const userExists = DUMMY_USERS.find((u) => u.email === email)
	if (userExists) {
		throw new HttpError('Could not create user', 422)
	}

	const newUser = { username, email, password, id: uuid() }
	DUMMY_USERS.push(newUser)
	res.status(201).json({ message: 'Signup successful', newUser })
}

const login = (req, res, next) => {
	const { email, password } = req.body

	const userValid = DUMMY_USERS.find((u) => u.email === email)

	if (!userValid || userValid.password !== password) {
		throw new HttpError('Email or password incorrect', 401)
	}
	res.json({ message: 'Login successful!' })
}

module.exports = { signup, login }
