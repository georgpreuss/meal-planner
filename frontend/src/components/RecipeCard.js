import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Container from '@material-ui/core/Container'
import SimpleRating from './Rating'
import Auth from '../lib/Auth'
import { ModalContext } from './ModalContext'

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
}))

const RecipeCard = ({ recipe }) => {
	const classes = useStyles()
	const [expanded, setExpanded] = useState(false)
	const { collectionIds, setCollectionIds } = useContext(ModalContext)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	const saveToCollection = () => {
		axios
			.put(
				'/api/users/collection',
				{ recipeId: recipe._id },
				{
					headers: { Authorization: `Bearer ${Auth.getToken()}` }
				}
			)
			.then((resp) => setCollectionIds(resp.data.collection))
			.catch((error) => console.log(error))
	}

	const removeFromCollection = () => {
		axios
			.delete('/api/users/collection', {
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
				data: { recipeId: recipe._id }
			})
			.then((resp) => setCollectionIds(resp.data.collection))
			.catch((error) => console.log(error))
	}

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				disableTypography={false}
				title={recipe.title}
				subheader={recipe.source}
				// TODO change styling: remove link default styling
				component={Link}
				to={`/recipe/${recipe._id}`}
			/>
			<Container>
				<SimpleRating />
			</Container>
			<CardMedia
				className={classes.media}
				image={recipe.image}
				component={Link}
				to={`/recipe/${recipe._id}`}
			/>
			{/* <CardContent>
			
			</CardContent> */}
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				{Auth.isAuthorized() ? (
					!collectionIds.includes(recipe._id) ? (
						<IconButton aria-label="save" onClick={saveToCollection}>
							<BookmarkBorderIcon />
						</IconButton>
					) : (
						<IconButton aria-label="save" onClick={removeFromCollection}>
							<DeleteOutlineIcon />
						</IconButton>
					)
				) : (
					<IconButton aria-label="save">
						<BookmarkBorderIcon />
					</IconButton>
				)}
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{recipe.description}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	)
}

export default RecipeCard
