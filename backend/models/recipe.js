const mongoose = require('mongoose')

// part peer review part personalisation
const userSettings = new mongoose.Schema({
	userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
	score: { type: Number, required: true }, // add validation, e.g. 1-5 which can be displayed as yummy emojis?
	prepEffort: { type: Number, required: true }, // add validation, e.g. 1-4
	cookEffort: { type: Number, required: true }, // add validation, e.g. 1-4
	serves: { type: Number, required: true }, // add validation - integers only
	images: [{ type: String }] // work out way to store user images
})

const ingredient = new mongoose.Schema({
	name: { type: String, required: true, unique: true }, // e.g. pepper
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
	creatorName: { type: String, required: true },
	creatorId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // change to grab username later
	version: { type: Number, required: true },
	ancestors: [{ type: String }], // change to recipe ids
	descendants: [{ type: String }], // change to recipe ids
	downloadedByUser: [{ type: String }], // change to user ids
	downloadedByGroup: [{ type: String }] // change to group ids
})

module.exports = mongoose.model('Recipe', recipeSchema)
