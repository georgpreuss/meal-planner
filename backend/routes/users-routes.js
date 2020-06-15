const express = require('express')
const { check } = require('express-validator')

const usersControllers = require('../controllers/users-controllers')
const secureRoute = require('../middleware/check-auth')

const router = express.Router()

router.post('/', usersControllers.checkAvailable)

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
	.route('/collection')
	.put(secureRoute, usersControllers.saveToCollection)
	.delete(secureRoute, usersControllers.removeFromCollection)

router
	.route('/:userId') // careful, could create issue with /signup if you also add post
	.get(usersControllers.getProfile)
	.put(secureRoute, usersControllers.changeProfile)
	.delete(secureRoute, usersControllers.deleteAccount)

router.post('/forgotPassword', usersControllers.forgotPassword)

module.exports = router
