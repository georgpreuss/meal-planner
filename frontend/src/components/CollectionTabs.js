import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { ModalContext } from './ModalContext'
import RecipeCollection from './RecipeCollection'

// TODO bug when you collapse/expand nav drawer tab underline shifts

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography component={'span'} variant={'body2'}>
						{children}
					</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
		flexGrow: 1
	}
}))

// TODO add logic for loading another user's profile is userId passed
const CollectionTabs = () => {
	const classes = useStyles()
	const theme = useTheme()
	const [value, setValue] = useState(0)
	const { profile, recipes } = useContext(ModalContext)

	// TODO refactor
	let collectedRecipes
	if (profile.recipeCollection) {
		collectedRecipes = recipes.filter((recipe) => {
			return profile.recipeCollection.includes(recipe._id)
		})
	}

	let createdRecipes
	if (profile.recipesCreated) {
		createdRecipes = recipes.filter((recipe) => {
			return profile.recipesCreated.includes(recipe._id)
		})
	}

	let favouriteRecipes
	if (profile.favouriteRecipes) {
		favouriteRecipes = recipes.filter((recipe) => {
			return profile.favouriteRecipes.includes(recipe._id)
		})
	}

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleChangeIndex = (index) => {
		setValue(index)
	}

	return (
		<div className={classes.root}>
			<Paper position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
					centered
				>
					<Tab label="Bookmarked" {...a11yProps(0)} />
					<Tab label="Favourites" {...a11yProps(1)} />
					<Tab label="Added by you" {...a11yProps(2)} />
				</Tabs>
			</Paper>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<RecipeCollection recipes={collectedRecipes} />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<RecipeCollection recipes={favouriteRecipes} />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<RecipeCollection recipes={createdRecipes} />
				</TabPanel>
			</SwipeableViews>
		</div>
	)
}

export default CollectionTabs
