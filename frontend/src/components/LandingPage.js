import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import RecipeCard from './RecipeCard'
import { ModalContext } from './ModalContext'

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
	const { recipes } = useContext(ModalContext)

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
