const mongoose = require('mongoose')

// part peer review part personalisation - unlike recipe itself these should always be editable directly
const userSettings = new mongoose.Schema({
	userId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
	score: { type: Number, required: true }, // add validation, e.g. 1-5 which can be displayed as yummy emojis?
	prepEffort: { type: Number, required: true }, // add validation, e.g. 1-4
	cookEffort: { type: Number, required: true }, // add validation, e.g. 1-4
	serves: { type: Number, required: true }, // add validation - integers only
	images: [{ type: String }] // work out way to store user images
	// specialUtensils: [{ type: String }] // will impact effort levels
})

const ingredient = new mongoose.Schema({
	// link to ingredientSchema where names are unique - users can add to that schema but when creating recipes ingredients will be taken from that collection
	name: { type: String, required: true }, // e.g. pepper
	quantity: { type: Number }, // 1
	weight: { type: Number } // use mongoose pre validation to ensure at least one out of quantity and weight is provided
})

const recipeSchema = new mongoose.Schema({
	title: { type: String, required: true },
	originalAuthor: { type: String }, // make sure to give credit to the author
	userSettings: [userSettings],
	rating: { type: Number }, // empty at creation but then average of peer review scores
	prepEffort: { type: Number, required: true }, // empty at creation but then average of userSettings
	cookEffort: { type: Number, required: true }, // empty at creation but then average of userSettings
	serves: { type: Number, required: true },
	image: { type: String },
	description: { type: String },
	ingredients: [ingredient],
	units: { type: String, required: true }, // metric or imperial - don't forget validation!
	method: [{ type: String, required: true }],
	tags: { type: String }, // think of something clever - separate tags model to ensure unique tags?
	comments: [{ type: String }], // link to different schema later
	// creatorName: { type: String, required: true }, // better remove: if user changes username this reference will be outdated
	creatorId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
	version: { type: Number, required: true },
	ancestors: [{ type: mongoose.Schema.ObjectId, ref: 'Recipe' }],
	descendants: [{ type: mongoose.Schema.ObjectId, ref: 'Recipe' }],
	downloadedByUser: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
	downloadedByGroup: [{ type: String }] // change to group ids
})

module.exports = mongoose.model('Recipe', recipeSchema)
