import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import { ModalContext } from './ModalContext'
import recipeSchema from '../../../backend/models/recipe'
import IngredientsTable from './IngredientsTable'
import Auth from '../lib/Auth'

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	}
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const RecipeModal = () => {
	const classes = useStyles()
	const { recipeModal, toggleRecipe, recipes, setRecipes } = useContext(
		ModalContext
	)
	const [recipe, setRecipe] = useState({
		data: {
			title: '',
			originalAuthor: '',
			userSettings: [
				{
					score: 4,
					prepTime: 4,
					cookTime: 4,
					serves: 4,
					images: ['img']
				}
			],
			averageScore: 4,
			prepTime: null,
			cookTime: null,
			serves: null,
			image: '',
			description: '',
			ingredients: [],
			recipeUnits: 'METRIC',
			method: [],
			tags: 'tag example'
			// version: 1,
		},
		errors: {}
	})
	const [method, setMethod] = useState([''])

	const [ingredients, setIngredients] = useState([
		{
			name: '',
			// amount: null,
			amount: '',
			units: '',
			notes: ''
		}
	])

	const handleChange = (e) => {
		const data = {
			...recipe.data,
			[e.target.name]:
				e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
		}
		const errors = { ...recipe.errors, [e.target.name]: '' }
		console.log('recipe: ', data)
		setRecipe({ data, errors })
	}

	// TODO swap e and index in args
	const handleChangeMethod = (index, e) => {
		const values = [...method]
		values[index] = e.target.value
		setMethod(values) // take this out and all instances it affects
		const data = { ...recipe.data, method: values }
		console.log('recipe: ', data)
		setRecipe({ data })
	}

	// TODO swap e and index in args
	const handleChangeIngredients = (index, e) => {
		const values = [...ingredients]
		values[index][e.target.name] =
			e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
		setIngredients(values) // take this out and all instances it affects
		const data = { ...recipe.data, ingredients: values }
		console.log('recipe: ', data)
		setRecipe({ data })
	}

	const handleSubmit = (e) => {
		console.log('attempting submit')
		e.preventDefault()
		axios
			.post('/api/recipes', recipe.data, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			.then((resp) => {
				const newRecipes = [...recipes]
				newRecipes.push(resp.data.newRecipe)
				setRecipes(newRecipes)
				toggleRecipe()
			})
			.catch((errors) => {
				setRecipe({ errors })
				throw errors
			})
	}

	const addStep = () => {
		const values = [...method]
		values.push('')
		setMethod(values)
	}

	const removeStep = (index) => {
		const values = [...method]
		values.splice(index, 1)
		setMethod(values)
		// TODO need to setRecipe
	}

	const addIngredient = () => {
		const values = [...ingredients]
		values.push({
			name: '',
			// amount: null,
			amount: '',
			units: '',
			notes: ''
		})
		setIngredients(values)
	}

	const removeIngredient = (index) => {
		const values = [...ingredients]
		values.splice(index, 1)
		setIngredients(values)
		// TODO need to setRecipe
	}

	// REACTIVATE ONCE BUGS FIXED
	// useEffect(() => {
	// 	const arrayLength = ingredients.length
	// 	if (ingredients[arrayLength - 1].amount !== null) {
	// 		addIngredient()
	// 	}
	// }, [ingredients])

	return (
		<section className="section">
			<div className="container">
				<div className={classes.root}>
					<Dialog
						fullScreen
						open={recipeModal}
						onClose={toggleRecipe}
						TransitionComponent={Transition}
					>
						<AppBar className={classes.appBar}>
							<Toolbar>
								<IconButton
									edge="start"
									color="inherit"
									onClick={toggleRecipe}
									aria-label="close"
								>
									<CloseIcon />
								</IconButton>
								<Typography variant="h6" className={classes.title}>
									New Recipe
								</Typography>
								{/* <Button autoFocus color="inherit" onClick={handleClose}> */}
								<Button color="inherit" onClick={handleSubmit}>
									save
								</Button>
							</Toolbar>
						</AppBar>
						<form onSubmit={handleSubmit}>
							<div onChange={handleChange}>
								<TextField
									// variant="outlined"
									margin="normal"
									fullWidth
									label="Title"
									name="title" // match state (and API?)
									autoFocus
								/>
								<TextField
									// variant="outlined"
									margin="normal"
									fullWidth
									label="Source (URL or author and cook book)"
									name="originalAuthor" // match API
								/>
								<TextField
									// variant="outlined"
									margin="normal"
									label="Short description"
									fullWidth
									name="description" // match API
								/>
								<TextField
									// variant="outlined"
									margin="normal"
									label="Serves (e.g. 4)"
									name="serves" // match API
									type="number"
								/>
								<TextField
									// variant="outlined"
									margin="normal"
									label="Preparation time"
									name="prepTime" // match API
									type="number"
								/>
								<TextField
									// variant="outlined"
									margin="normal"
									label="Cooking time"
									name="cookTime" // match API
									type="number"
								/>
								{/* CHANGE TO IMAGE UPLOAD LATER */}
								<TextField
									// variant="outlined"
									margin="normal"
									label="Image"
									name="image" // match API
								/>
							</div>
							<div>
								<IngredientsTable
									ingredients={ingredients}
									handleChangeIngredients={handleChangeIngredients}
									addIngredient={addIngredient}
									removeIngredient={removeIngredient}
								/>
								{/* TODO: same margin and styling as ingredients */}
								<h1 className="title is-5">Recipe Steps</h1>
								{method.map((step, i) => {
									return (
										<TextField
											key={i}
											// variant="outlined"
											label={`Step ${i + 1}`}
											fullWidth
											value={step}
											onChange={(e) => handleChangeMethod(i, e)}
											InputProps={{
												endAdornment: (
													<>
														{method.length > 1 && (
															<IconButton onClick={() => removeStep(i)}>
																<RemoveIcon />
															</IconButton>
														)}
														<IconButton onClick={addStep}>
															<AddIcon />
														</IconButton>
													</>
												)
											}}
										/>
									)
								})}
								{/* TODO: option to add new ingredient - via modal? */}
							</div>
						</form>
					</Dialog>
				</div>
			</div>
		</section>
	)
}

export default RecipeModal
