const dotenv = require('dotenv')
dotenv.config()

const port = 5000
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-dy84o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

module.exports = {
	port,
	dbURI
}
