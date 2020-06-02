const mongoose = require('mongoose')
const uniqueValidator = require('../node_modules/mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minLength: 6 },
	image: { type: String, required: true },
	// units: { type: String, required: true }, // e.g. metric or imperial
	recipesCreated: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }] // rename recipesCreated?
	// recipesCollection: [{type: String}] //
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
