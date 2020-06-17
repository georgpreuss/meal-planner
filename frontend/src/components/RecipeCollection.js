import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

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

const RecipeCollection = ({ recipes }) => {
	const classes = useStyles()

	return (
		<>
			<div className={classes.root}>
				<Grid container spacing={3}>
					{recipes &&
						recipes.map((recipe, i) => {
							return (
								<Grid key={i} item xs={6} sm={3}>
									<RecipeCard recipe={recipe} />
								</Grid>
							)
						})}
				</Grid>
			</div>
		</>
	)
}

export default RecipeCollection
