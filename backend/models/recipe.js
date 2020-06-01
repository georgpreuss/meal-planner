const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
	title: { type: String, required: true },
	originalAuthor: { type: String }, // make sure to give credit to the author
	rating: { type: Number, required: true }, // should it be required?
	prepEffort: { type: Number, required: true }, // add validation e.g. 1-3 or 1-4
	cookEffort: { type: Number, required: true }, // add validation here as well
	serves: { type: Number, required: true }, // add validation - integers only
	image: { type: String },
	description: { type: String },
	ingredients: { type: String, required: true }, // replace with subschema later
	method: { type: String, required: true }, // replace with subschema later
	tags: { type: String }, // think of something clever
	comments: [{ type: String }], // link to different schema later
	creatorName: { type: String, required: true },
	creatorId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' } // change to grab username later
	// savedBy: [{ type: String }] // to capture how many people have it in their personal recipe collections - better in user schema as recipe array?
	// forkedFrom: [{type: String, required: true}] // array where first entry corresponds to master's creatorID
	// groupId: { type: mongoose.Types.ObjectId } // if common creation for e.g. event, flatshare
})

module.exports = mongoose.model('Recipe', recipeSchema)

// example recipe format
// {
//   id: 'rec1',
//   title: 'Carbonara',
//   postedBy: 'me',
//   source: 'The Silver Spoon',
//   rating: 5,
//   prepTime: 1,
//   cookTime: 1,
//   serves: 4,
//   image: 'http://www.fillmurray.com/200/300',
//   description: 'this is a simple but delicious pasta dish',
//   ingredients: [
//     { name: 'pasta', unit: 'grams', quantity: 500 },
//     { name: 'parmesan', unit: 'grams', quantity: 100 }
//   ],
//   method: [
//     { step: 1, description: 'Grate cheese' },
//     { step: 2, description: 'fry bacon' }
//   ],
//   tags: ['pasta', 'italian'],
//   comments: []
// },
