const express = require('../node_modules/express')
const { check } = require('../node_modules/express-validator/src')

const usersControllers = require('../controllers/users-controllers')

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

router.post('/logout')

router.post('/deleteAccount') // delete account

module.exports = router
