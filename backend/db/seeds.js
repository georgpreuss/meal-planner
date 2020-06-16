const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const { dbURI } = require('../config/environment')

const User = require('../models/user')
const Recipe = require('../models/recipe')

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
						passwordConfirmation: '123456',
						image: 'img',
						units: 'metric'
					},
					{
						username: 'user2',
						email: 'user2@email.com',
						password: '123456',
						passwordConfirmation: '123456',
						image: 'img',
						units: 'imperial'
					},
					{
						username: 'dev',
						email: 'dev@email.com',
						password: '123456',
						passwordConfirmation: '123456',
						image: 'img',
						units: 'metric'
					}
				])
			})
			.then((users) => {
				return Recipe.create([
					{
						title: 'Southern Thai Chicken Panang Curry',
						originalAuthor:
							'https://www.gousto.co.uk/cookbook/chicken-recipes/southern-thai-chicken-panang-curry',
						userSettings: [
							{
								userId: users[0],
								score: 1,
								prepTime: 30,
								cookTime: 20,
								serves: 2,
								images: ['img1', 'img2']
							}
						],
						// leave empty at creation
						averageScore: 1,
						// following 3 fields should be copied automatically from userSettings
						prepTime: 30,
						cookTime: 20,
						serves: 2,
						// first and hopefully best img from userSettings
						image:
							'https://production-media.gousto.co.uk/cms/mood-image/1114-Southern-Thai-Chicken-Panang-Curry-x750.jpg',
						description:
							"This fragrant curry is inspired by Southern Thai cuisine. For your punchy Panang, you'll infuse chicken with peanut butter, coconut and Thai red curry paste, then serve with rice. Aroi mak!",
						ingredients: [
							{
								name: 'brown onion',
								amount: 1,
								units: '',
								notes: 'finely sliced'
							},
							{
								name: 'chicken breast',
								amount: 250,
								units: 'g',
								notes: 'diced'
							},
							{
								name: 'ground turmeric',
								amount: 1,
								units: 'tsp',
								notes: ''
							},
							{
								name: 'romano pepper',
								amount: 1,
								units: '',
								notes: 'cut into thin strips'
							},
							{
								name: 'basmati rice',
								amount: 130,
								units: 'g',
								notes: ''
							},
							{
								name: 'fish sauce',
								amount: 15,
								units: 'mL',
								notes: ''
							},
							{
								name: 'smooth peanut butter',
								amount: 26,
								units: 'g',
								notes: ''
							},
							{
								name: 'fried onions',
								amount: 15,
								units: 'g',
								notes: ''
							},
							{
								name: 'solid coconut cream',
								amount: 15,
								units: 'g',
								notes: ''
							},
							{
								name: 'thai red curry paste',
								amount: 20,
								units: 'g',
								notes: ''
							}
						],
						recipeUnits: 'metric',
						method: [
							'Add the basmati rice and 300ml [600ml] cold water to a pot with a lid and bring to the boil over a high heat\nOnce boiling, reduce the heat to very low and cook, covered, for 10-12 min or until all the water has been absorbed and the rice is cooked\nOnce cooked, remove from the heat and keep covered until serving',
							'Meanwhile, peel and finely slice the brown onion[s]\nDeseed the Romano pepper[s] (scrape the seeds and pith out with a teaspoon) and cut into thin strips',
							'Heat a large, wide-based pan (preferably non-stick) with a drizzle of vegetable oil over a medium heat\nOnce hot, add the chopped onion and Romano pepper and cook for 4-5 min or until starting to soften',
							'Boil a kettle\nRemove the coconut cream from the sachet[s] and chop it roughly',
							'Dissolve the chopped coconut cream and smooth peanut butter in 250ml [450ml] boiled water\nAdd the ground turmeric, fish sauce and 1 tsp [2 tsp] sugar – this is your peanut stock',
							'Cut the chicken breast[s] into small bite-sized pieces\nOnce the vegetables have softened, add the chopped chicken and Thai red curry paste to the pan and cook for 3-4 min or until fragrant',
							'Once fragrant, add the peanut stock and cook for 7-8 min further or until the chicken is cooked through (no pink meat!) and the sauce has thickened\nSeason with a pinch of salt – this is your chicken panang curry\nTip: If the curry is looking a little dry, add a splash of water to loosen the sauce'
						],
						// servingSuggestion: 'Serve the chicken panang curry with the cooked basmati rice to the side\nTip: For fancy presentation, press the rice into small bowls and turn out\nGarnish with the fried onions\nEnjoy!',
						// change to array of strings
						tags: 'tag1',
						comments: [],
						creatorId: users[0],
						version: 1,
						ancestors: [],
						descendants: [],
						downloadedByUser: [],
						downloadedByGroup: []
					},
					{
						title: '10-Min Chorizo & Tenderstem Fusilli',
						originalAuthor:
							'https://www.gousto.co.uk/cookbook/pork-recipes/10-min-chorizo-tenderstem-fusilli',
						userSettings: [
							{
								userId: users[1],
								score: 1,
								prepTime: 10,
								cookTime: 10,
								serves: 2,
								images: ['img1', 'img2']
							}
						],
						// leave empty at creation
						averageScore: 1,
						// following 3 fields should be copied automatically from userSettings
						prepTime: 10,
						cookTime: 10,
						serves: 2,
						// first and hopefully best img from userSettings
						image:
							'https://production-media.gousto.co.uk/cms/mood-image/1764--Ten-Min-Chorizo--Tenderstem-Fusilli-x750.jpg',
						description:
							"This speedy pasta dish is bursting with sweet seasonal cherry tomatoes. You'll stir them with smoky chorizo, crisp Tenderstem and fusilli in a rich, creamy sauce. Stir, scoop, serve – done!",
						ingredients: [
							{
								name: 'cherry tomatoes',
								amount: 125,
								units: 'g',
								notes: 'halved'
							},
							{
								name: 'tenderstem broccoli',
								amount: 80,
								units: 'g',
								notes: 'chopped in half'
							},
							{
								name: 'soft cheese',
								amount: 50,
								units: 'g',
								notes: ''
							},
							{
								name: 'chorizo',
								amount: 100,
								units: 'g',
								notes: 'diced'
							},
							{
								name: 'parmesan',
								amount: 35,
								units: 'g',
								notes: 'grated'
							},
							{
								name: 'fusilli',
								amount: 150,
								units: 'g',
								notes: ''
							},
							{
								name: 'tomato paste',
								amount: 16,
								units: 'g',
								notes: ''
							},
							{
								name: 'garlic paste',
								amount: 15,
								units: 'g',
								notes: ''
							}
						],
						recipeUnits: 'metric',
						method: [
							'Boil a kettle\nChop the Tenderstem broccoli in half (chop them in one bunch for speed!)',
							'Heat a large, dry, wide-based pan (preferably non-stick) over a medium-high heat\nOnce hot, add the diced chorizo and cook for 3 min or until beginning to crisp',
							'Meanwhile, add the quick cook fusilli and chopped Tenderstem to a pot of boiled water with a large pinch of salt and bring to the boil over a high heat\nCook the fusilli for just 2 min (it will keep cooking in the sauce later!)\nOnce done, drain the fusilli and Tenderstem, reserving a cup of the starchy pasta water',
							'Chop the cherry tomatoes in half',
							'Once the chorizo is crisp, add the roasted garlic paste and tomato paste to the pan and cook for 30 secs\nAdd the soft cheese and give everything a good mix up',
							'Add the chopped tomatoes, drained fusilli and Tenderstem and add a splash of the starchy pasta water\nSeason with a pinch of salt and pepper and cook for 1 min or until the sauce beings to stick to the pasta – this is your chorizo & Tenderstem fusilli\nTip: Add a splash more starchy pasta water if your sauce is looking a little dry'
						],
						// servingSuggestion: 'Set the chorizo & Tenderstem fusilli in the centre of the table, ready to share\nTop with the grated Italian hard cheese and let everyone dig in\nEnjoy!',
						// change to array of strings
						tags: 'tag1',
						comments: [],
						creatorId: users[1],
						version: 1,
						ancestors: [],
						descendants: [],
						downloadedByUser: [],
						downloadedByGroup: []
					},
					{
						title: 'Bean Chilli with Brown Rice and Citrus Crème Fraîche',
						originalAuthor:
							'https://www.hellofresh.co.uk/recipes/bean-chilli-with-brown-rice-wk52-5819d2ffc7262823771b3de2',
						userSettings: [
							{
								userId: users[2],
								score: 1,
								prepTime: 35,
								cookTime: 25,
								serves: 2,
								images: ['img1', 'img2']
							}
						],
						// leave empty at creation
						averageScore: 1,
						// following 3 fields should be copied automatically from userSettings
						prepTime: 35,
						cookTime: 25,
						serves: 2,
						// first and hopefully best img from userSettings
						image:
							'https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_auto,w_2600/hellofresh_s3/image/bean-chilli-with-brown-rice-wk52-62290816.jpg',
						description:
							'We’re a traditional bunch here at the Fresh Farm. That’s why we decided to use chipotle, a smoky chilli paste, produced by local farmers in the Oaxaca region of Mexico, who use age-old methods to work the land and produce this rich, sweet, spicy concoction. Add bit by bit, it’s hot!',
						ingredients: [
							{
								name: 'brown basmati rice',
								amount: 175,
								units: 'g',
								notes: ''
							},
							{
								name: 'red onion',
								amount: 0.5,
								units: '',
								notes: 'thinly sliced'
							},
							{
								name: 'cumin',
								amount: 1.5,
								units: 'tsp',
								notes: ''
							},
							{
								name: 'chopped tomatoes (tin)',
								amount: 1,
								units: '',
								notes: ''
							},
							{
								name: 'mixed beans (tin)',
								amount: 0.5,
								units: '',
								notes: ''
							},
							{
								name: 'vegetable stock pot',
								amount: 0.5,
								units: '',
								notes: ''
							},
							{
								name: 'chipotle paste',
								amount: 0.5,
								units: 'tbsp',
								notes: ''
							},
							{
								name: 'lime',
								amount: 0.5,
								units: '',
								notes: 'grated & juiced'
							},
							{
								name: 'crème fraîche',
								amount: 3,
								units: 'tbsp',
								notes: ''
							},
							{
								name: 'tomato puree',
								amount: 1,
								units: 'tbsp',
								notes: ''
							}
						],
						recipeUnits: 'metric',
						method: [
							'Boil a pot of water with a pinch of salt. Rinse the rice in a sieve under running water for 1 minute. Pop the rice in the pot and boil for 25 mins, then drain and put back in the pot. Cover with a tea towel and leave off the heat until the chilli is ready.',
							'Cut the red onion in half through the root, peel and thinly slice into half moon shapes.',
							'Heat a splash of olive oil in a frying pan on medium-low heat. Once hot, add your onion with a pinch of salt and pepper. Stir your onion and place a lid on the pan. After 5 mins, take the lid off the pan, add the cumin and tomato purée and stir everything together.',
							'After 1 minute, add the chopped tomatoes and a pinch of sugar (if you have some) and turn the heat to medium.',
							'Drain and rinse the mixed beans and add to the pan along with the vegetable stock pot. Lastly, add the chipotle paste. Tip: Add the chipotle paste to taste, it’s hot! Simmer on low heat for 5-10 mins.',
							'Zest and juice the lime and mix a pinch of the zest and dash of the juice into the crème fraîche. Tip: When zesting (i.e. grating) the lime, don’t go down to the white part underneath the skin as this tastes bitter.'
						],
						// servingSuggestion: 'Serve your bean chilli with your rice, a good dollop of citrus crème fraîche and a big splash of lime juice.',
						// change to array of strings
						tags: 'tag1',
						comments: [],
						creatorId: users[2],
						version: 1,
						ancestors: [],
						descendants: [],
						downloadedByUser: [],
						downloadedByGroup: []
					},
					{
						title: 'Chicken Katsu Curry',
						originalAuthor:
							'https://www.gousto.co.uk/cookbook/chicken-recipes/chicken-katsu-curry',
						userSettings: [
							{
								userId: users[2],
								score: 1,
								prepTime: 40,
								cookTime: 20,
								serves: 2,
								images: ['img1', 'img2']
							}
						],
						// leave empty at creation
						averageScore: 1,
						// following 3 fields should be copied automatically from userSettings
						prepTime: 40,
						cookTime: 20,
						serves: 2,
						// first and hopefully best img from userSettings
						image:
							'https://production-media.gousto.co.uk/cms/mood-image/769--Chicken-Katsu-Curry-x750.jpg',
						description:
							"Take a walk on the mild side with a crispy chicken katsu curry. You'll serve this Japanese-style supper with an umami-rich curry sauce, wholesome brown rice and fresh salad to the side. Katsu-perb!",
						ingredients: [
							{
								name: 'shallot',
								amount: 1,
								units: '',
								notes: 'chopped'
							},
							{
								name: 'brown rice',
								amount: 130,
								units: 'g',
								notes: ''
							},
							{
								name: 'egg',
								amount: 1,
								units: '',
								notes: ''
							},
							{
								name: 'fresh root ginger',
								amount: 15,
								units: 'g',
								notes: 'grated'
							},
							{
								name: 'soy sauce',
								amount: 8,
								units: 'g',
								notes: ''
							},
							{
								name: 'baby leaf salad',
								amount: 50,
								units: 'g',
								notes: ''
							},
							{
								name: 'mango chutney',
								amount: 20,
								units: 'g',
								notes: ''
							},
							{
								name: 'curry powder',
								amount: 1,
								units: 'tbsp',
								notes: ''
							},
							{
								name: 'carrot',
								amount: 1,
								units: 'grated',
								notes: ''
							},
							{
								name: 'rice vinegar',
								amount: 15,
								units: 'mL',
								notes: ''
							},
							{
								name: 'chicken breast',
								amount: 250,
								units: 'g',
								notes: ''
							},
							{
								name: 'panko breadcrumbs',
								amount: 30,
								units: 'g',
								notes: ''
							}
						],
						recipeUnits: 'metric',
						method: [
							"Rinse the brown rice, add it to a pot with plenty of cold water and bring to the boil over a high heat\nOnce boiling, reduce the heat to medium and cook for 15-20 min or until it's tender with a slight bite\nOnce cooked, drain, return it to the pot and keep covered until serving",
							'Top, tail and peel half the carrot[s] into a pile of ribbons\nGrate the remaining carrot\nPeel (scrape the skin off with a teaspoon) and finely chop (or grate) the ginger\nPeel and chop the shallot[s]',
							'Crack the egg[s] into a shallow bowl and beat lightly with a fork\nAdd 2 tbsp [4 tbsp] flour to a plate and season with salt and pepper, then add the panko breadcrumbs to another plate',
							'Coat the chicken breasts in the flour, tap off the excess, then add it into the beaten egg and finally press it into the breadcrumbs firmly to evenly coat all over\nBoil a kettle',
							'Heat a large, wide-based pan (preferably non-stick with a matching lid), with 2-3 tbsp vegetable oil over a medium heat\nOnce hot, add the grated carrot, ginger and shallot and cook for 3 min\nAdd the curry powder and cook for a further 2 min\nAdd 1 tbsp [2 tbsp] flour and cook for 1 min, stirring to coat the vegetables evenly',
							'Add 300ml [600ml] boiled water and reduce the heat to low\nAdd the soy sauce and stir through the mango chutney\nCook for 5-7 min or until the sauce has thickened to a curry-like consistency\nSeason with a generous pinch of salt, cover with a lid and set aside for later – this is your katsu sauce',
							'Heat a separate, large, wide-based pan (preferably non-stick) with a very generous drizzle of vegetable oil (enough to cover the base of the pan) over a medium-high heat\nOnce hot, add the coated chicken and cook for 5-6 min on each side pressing down firmly with a spatula until the outside is golden and the chicken is cooked through (no pink meat!)\nIn a large bowl combine the rice vinegar with 2 tbsp [4 tbsp] olive oil and a pinch of salt – this is your dressing',
							'Wash the baby leaf salad, then add the salad and the carrot ribbons to the bowl with the dressing and give it a good mix up\nSlice the cooked chicken into strips\nSpoon the katsu sauce onto the plate and serve the sliced chicken over sauce with the cooked brown rice and salad to the side\nEnjoy!'
						],
						// servingSuggestion: '',
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
