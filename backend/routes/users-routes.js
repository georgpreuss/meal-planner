const express = require('express')
const { check } = require('../../node_modules/express-validator/src')

const usersControllers = require('../controllers/users-controllers')
const secureRoute = require('../middleware/check-auth')

const router = express.Router()

router.post(
	'/signup',
	[
		check('username').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 6 })
	],
	usersControllers.signup
)

router.post('/login', usersControllers.login)

router
	.route('/:userId')
	.get(usersControllers.getProfile)
	.put(secureRoute, usersControllers.changeProfile)
	.delete(secureRoute, usersControllers.deleteAccount)

router.post('/forgotPassword', usersControllers.forgotPassword)

module.exports = router
