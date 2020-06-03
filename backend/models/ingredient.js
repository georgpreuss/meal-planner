const mongoose = require('mongoose')
const uniqueValidator = require('../../node_modules/mongoose-unique-validator')

const ingredientSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true }
})

ingredientSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Ingredient', ingredientSchema)
