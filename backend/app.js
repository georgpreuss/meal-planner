const express = require('./node_modules/express')
const bodyParser = require('./node_modules/body-parser')
const mongoose = require('mongoose')

const usersRoutes = require('./routes/users-routes')
const recipesRoutes = require('./routes/recipes-routes')
const collectionsRoutes = require('./routes/collections-routes')
const HttpError = require('./models/http-error')
const { port, dbURI } = require('./config/environment')

const app = express()

app.use(bodyParser.json())

app.use('/api/users', usersRoutes)
app.use('/api/recipes', recipesRoutes)
app.use('/api/collections', collectionsRoutes)

app.use((req, res, next) => {
	const error = new HttpError('Could not find this route', 404)
	throw error
})

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error)
	}
	res.status(error.code || 500)
	res.json({ message: error.message || 'An unknown error occurred!' })
})

mongoose
	.connect(
		dbURI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		},
		() => console.log('Connection to database established successfully')
	)
	.then(() => app.listen(port))
	.catch((err) => console.log(err))
