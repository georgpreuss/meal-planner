const jwt = require('jsonwebtoken')

const HttpError = require('../models/http-error')

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1] //Authorization: 'Bearer TOKEN'
		if (!token) {
			throw new Error('Authentication failed!')
		}
		const decodedToken = jwt.verify(token, process.env.JWT_KEY) // this decrypts the token and shows what you passed in signup or login
		req.userData = { userId: decodedToken.userId } // what does this do?
		next()
	} catch (err) {
		const error = new HttpError('Authentication failed!', 401)
		return next(error)
	}
}