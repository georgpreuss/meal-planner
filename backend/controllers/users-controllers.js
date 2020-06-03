// const { validationResult } = require('../node_modules/express-validator/src')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const User = require('../models/user')
const { port } = require('../config/environment')

const signup = (req, res, next) => {
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
		.catch(next)
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

module.exports = {
	signup,
	login,
	getProfile,
	changeProfile,
	deleteAccount,
	forgotPassword
}
