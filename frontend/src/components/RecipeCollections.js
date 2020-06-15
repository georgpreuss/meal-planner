import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { ModalContext } from './ModalContext'
import RecipeCard from './RecipeCard'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}))

const RecipeCollections = (props) => {
	const classes = useStyles()
	// const [collectionIds, setCollectionIds] = useState([])
	// const [createdIds, setCreatedIds] = useState([])
	const { recipes, profile } = useContext(ModalContext)

	const collectedIds = profile.recipeCollection // TODO change to recipesCollected ?
	const createdIds = profile.recipesCreated

	let collectedRecipes
	if (collectedIds) {
		collectedRecipes = recipes.filter((recipe) => {
			return collectedIds.includes(recipe._id)
		})
	}
	let createdRecipes
	if (createdIds) {
		createdRecipes = recipes.filter((recipe) => {
			return createdIds.includes(recipe._id)
		})
	}

	// TODO add logic for loading another user's profile is userId passed

	return (
		<>
			<div className={classes.root}>
				<h1>Your collection</h1>
				<Grid container spacing={3}>
					{collectedRecipes &&
						collectedRecipes.map((recipe, i) => {
							return (
								<Grid key={i} item xs={6} sm={3}>
									<RecipeCard recipe={recipe} />
								</Grid>
							)
						})}
				</Grid>
				<h1>Added by you</h1>
				<Grid container spacing={3}>
					{createdRecipes &&
						createdRecipes.map((recipe, i) => {
							return (
								<Grid key={i} item xs={6} sm={3}>
									<RecipeCard recipe={recipe} />
								</Grid>
							)
						})}
				</Grid>
			</div>
			{/* <h1>Recipes in collection</h1>
			<RecipeCard />
			{collected &&
				collected.map((recipe, i) => {
					return <h1 key={i}>{recipe}</h1>
				})}
			<h1>Recipes created</h1>
			{created &&
				created.map((recipe, i) => {
					return <h1 key={i}>{recipe}</h1>
				})} */}
		</>
	)
}

export default RecipeCollections
