const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')

const User = require('../models/user')
const Recipe = require('../models/recipe')

// possibly won't work with cloud atlas?
mongoose.connect(
	dbURI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	(err, db) => {
		if (err) return console.log(err)
		db.dropDatabase()
			.then(() => {
				return User.create([
					{
						username: 'user1',
						email: 'user1@email.com',
						password: '123456',
						passwordConfirmation: '123456'
					},
					{
						username: 'user2',
						email: 'user2@email.com',
						password: '123456',
						passwordConfirmation: '123456'
					},
					{
						username: 'dev',
						email: 'dev@email.com',
						password: '123456',
						passwordConfirmation: '123456'
					}
				])
			})
			.then((users) => {
				return Recipe.create([
					{
						title: 'recipe1',
						originalAuthor: 'oAuth1',
						userSettings: [
							{
								score: 1,
								prepEffort: 1,
								cookEffort: 1,
								serves: 1,
								images: ['img1', 'img2']
							}
						],
						// leave empty at creation
						averageScore: 1,
						// following 3 fields should be copied automatically from userSettings
						prepEffort: 1,
						cookEffort: 1,
						serves: 1,
						// first and hopefully best img from userSettings
						image: 'img1',
						description: 'description',
						ingredients: [
							{
								name: 'ingredient1',
								unit: 'metric',
								quantity: 1,
								weight: 100 // should I add further field for scale - kg, g, etc.?
							},
							{
								name: 'ingredient2',
								unit: 'metric',
								quantity: 1,
								weight: 100 // should I add further field for scale - kg, g, etc.?
							}
						],
						recipeUnits: 'metric',
						method: ['step1', 'step2', 'step3'],
						// change to array of strings
						tags: 'tag1',
						comments: [],
						creatorId: users[2],
						version: 1,
						ancestors: [],
						descendants: [],
						downloadedByUser: [],
						downloadedByGroup: []
					}
				])
			})
			.catch((err) => console.log(err))
			.finally(() => mongoose.connection.close())
	}
)
