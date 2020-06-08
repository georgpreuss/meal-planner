import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { ModalContext } from './ModalContext'
import SignupLoginModal from './SignupLoginModal'
import RecipeModal from './RecipeModal'
import Auth from '../lib/Auth'
import AppBarCustom from './AppBar'
import CollapseOnScroll from './testing'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	grow: {
		flexGrow: 1
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	}
}))

const Navigation = ({ children }) => {
	const classes = useStyles()
	const theme = useTheme()
	const history = useHistory()
	const [openDrawer, setOpenDrawer] = useState(true)
	const { toggleModal, toggleRecipe, loggedIn, setLoggedIn } = useContext(
		ModalContext
	)

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer)
	}

	const signout = () => {
		Auth.logout()
		setLoggedIn(!loggedIn)
		history.push('/')
	}

	return (
		<>
			<div className={classes.root}>
				<CssBaseline />
				{/* why can't I pass both props in one object? */}
				<CollapseOnScroll>
					<AppBarCustom openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
				</CollapseOnScroll>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={openDrawer}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={toggleDrawer}>
							{theme.direction === 'ltr' ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<List>
						<ListItem
							button
							onClick={!Auth.isAuthorized() ? toggleModal : signout}
						>
							{Auth.isAuthorized() && (
								<ListItemIcon>
									<ExitToAppIcon />
								</ListItemIcon>
							)}
							<ListItemText>
								{!Auth.isAuthorized() ? 'Signup / Login' : 'Signout'}
							</ListItemText>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem button component={Link} to="/">
							<ListItemIcon>
								<LibraryBooksIcon />
							</ListItemIcon>
							<ListItemText>Browse recipes</ListItemText>
						</ListItem>
						<ListItem button component={Link} to="/collections">
							<ListItemIcon>
								<LocalLibraryIcon />
							</ListItemIcon>
							<ListItemText>Recipe collections</ListItemText>
						</ListItem>
						<ListItem button onClick={toggleRecipe}>
							<ListItemIcon>
								<LibraryAddIcon />
							</ListItemIcon>
							<ListItemText>New recipe</ListItemText>
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<LocalGroceryStoreIcon />
							</ListItemIcon>
							<ListItemText>New shopping list</ListItemText>
						</ListItem>
					</List>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: openDrawer
					})}
				>
					<div className={classes.drawerHeader} />
					{children}
				</main>
			</div>
			<SignupLoginModal />
			<RecipeModal />
		</>
	)
}

export default Navigation
