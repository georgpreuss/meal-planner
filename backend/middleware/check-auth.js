const User = require('../models/user')
const jwt = require('jsonwebtoken')

const secureRoute = (req, res, next) => {
	if (
		!req.headers.authorization ||
		!req.headers.authorization.startsWith('Bearer')
	) {
		return res.status(401).json({ message: 'Unauthorized 1' })
	}
	const token = req.headers.authorization.split(' ')[1]
	// const token = req.headers.authorization.replace('Bearer ', '') // original from GA
	if (!token) {
		// if (token === '') // original from GA
		return res.status(401).json({ message: 'Unauthorized 2' })
	}
	jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
		// User.findById(payload.sub) // original from GA
		User.findById(payload.userId, '_id') // '_id' to ensure no only that and no sensitive data is transmitted, otherwise '-password' to exclude password
			.then((user) => {
				// console.log('user: ', user)
				// console.log('token: ', token)
				// console.log('payload.sub: ', payload.sub) // payload.sub undefined - investigate
				if (!user) return res.status(401).json({ message: 'Unauthorized 3' })
				req.currentUser = user
				next()
			})
			.catch(() => res.status(401).json({ message: 'Unauthorized 4' }))
	})
}
module.exports = secureRoute
