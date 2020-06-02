const mongoose = require('mongoose')

const Schema = mongoose.Schema

const collectionSchema = new Schema({
	test: { type: String }
})

module.exports = mongoose.model('Collection', collectionSchema)
