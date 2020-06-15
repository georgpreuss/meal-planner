import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import RecipeCard from './RecipeCard'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	}
	// paper: {
	// 	padding: theme.spacing(2),
	// 	textAlign: 'center',
	// 	color: theme.palette.text.secondary
	// }
}))

const BrowseRecipes = () => {
	const classes = useStyles()

	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		axios
			.get('api/recipes/')
			.then((resp) => {
				// console.log(resp.data)
				setRecipes(resp.data)
			})
			.catch((error) => console.log(error))
	}, [])

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{recipes.map((recipe, i) => {
					return (
						<Grid key={i} item xs={6} sm={3}>
							<RecipeCard recipe={recipe} />
						</Grid>
					)
				})}
			</Grid>
		</div>
	)
}

export default BrowseRecipes
