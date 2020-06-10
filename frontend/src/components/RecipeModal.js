import React, { useContext, useState, useEffect } from 'react'
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
	const { recipeModal, toggleRecipe } = useContext(ModalContext)
	const [recipe, setRecipe] = useState({
		// recipeSchema
		// data: {
		// 	title: '',
		// 	originalAuthor: '',
		// 	userSettings: {
		// 		score: null,
		// 		prepEffort: null,
		// 		cookEffort: null,
		// 		serves: null,
		// 		images: ['']
		// 	},
		// 	averageScore: null,
		// 	prepEffort: null, // same as userSettings
		// 	cookEffort: null, // same as userSettings
		// 	serves: null, // same as userSettings
		// 	image: '', // first of userSettings.images?
		// 	description: '',
		// 	recipeUnits: '',
		// 	ingredients: [],
		// 	method: [{ step: '' }]
		// },
		// errors: {}
	})
	const [method, setMethod] = useState([''])

	const [ingredients, setIngredients] = useState([
		{
			name: '',
			amount: null,
			units: '',
			notes: ''
		}
	])

	const handleChange = (e) => {
		const data = { ...recipe.data, [e.target.name]: e.target.value }
		const errors = { ...recipe.errors, [e.target.name]: '' }
		setRecipe({ data, errors })
	}

	const handleChangeMethod = (index, e) => {
		const values = [...method]
		values[index] = e.target.value
		setMethod(values)
		// SET recipe.data.method
	}

	const handleChangeIngredients = (index, e) => {
		const values = [...ingredients]
		values[index][e.target.name] = e.target.value
		console.log('ingredients: ', values)
		setIngredients(values)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('submit')
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
	}

	const addIngredient = () => {
		const values = [...ingredients]
		values.push({
			name: '',
			amount: null,
			units: '',
			notes: ''
		})
		setIngredients(values)
	}

	useEffect(() => {
		const arrayLength = ingredients.length
		if (ingredients[arrayLength - 1].amount !== null) {
			addIngredient()
		}
	}, [ingredients])

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
								<Button color="inherit" onClick={toggleRecipe}>
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
								/>
								<TextField
									// variant="outlined"
									margin="normal"
									label="Preparation time"
									name="prepEffort" // match API
								/>
								<TextField
									// variant="outlined"
									margin="normal"
									label="Cooking time"
									name="cookEffort" // match API
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
