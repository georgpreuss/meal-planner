import React, { useContext } from 'react'
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

import { ModalContext } from './ModalContext'

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

	return (
		<div>
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
				<form>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						label="Title"
						name="title" // match API
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						label="Description"
						name="description" // match API
					/>
				</form>
			</Dialog>
		</div>
	)
}

export default RecipeModal
