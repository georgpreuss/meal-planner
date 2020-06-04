const mongoose = require('mongoose')
const uniqueValidator = require('../../node_modules/mongoose-unique-validator')

const dietSchema = new mongoose.Schema({
	isMeat: { type: Boolean },
	isDairy: { type: Boolean },
	isEgg: { type: Boolean },
	isMilk: { type: Boolean },
	isFish: { type: Boolean }
})

// ADD ALLERGIES SOMEHOW

const ingredientSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	diet: { type: dietSchema, required: true }
})

ingredientSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Ingredient', ingredientSchema)
