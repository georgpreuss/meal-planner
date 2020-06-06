import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import { ModalContext } from './ModalContext'
import SignupLoginModal from './SignupLoginModal'
import Auth from '../lib/Auth'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
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
	}
}))

const Navigation = ({ children }) => {
	const classes = useStyles()
	const theme = useTheme()
	const history = useHistory()
	const [openDrawer, setOpenDrawer] = useState(true)
	const { toggleModal } = useContext(ModalContext)
	const [loggedIn, setLoggedIn] = useState(true) // not using loggedIn at the moment...

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer)
	}

	const signout = () => {
		Auth.logout()
		setLoggedIn(false) // bit of a cheat to get 'Signup / Login' to reappear
		history.push('/')
	}

	return (
		<>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					style={{ background: '#2E3B55' }}
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: openDrawer
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							edge="start"
							className={clsx(classes.menuButton, openDrawer && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							MEAL-PLANNER
						</Typography>
					</Toolbar>
				</AppBar>
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
						{/* {!Auth.isAuthorized() && (
							<ListItem button onClick={toggleModal}>
								<ListItemText>Signup / Login</ListItemText>
							</ListItem>
						)}
						{Auth.isAuthorized() && (
							<ListItem button onClick={signout}>
								<ListItemText>Signout</ListItemText>
							</ListItem>
						)} */}
						<ListItem
							button
							onClick={!Auth.isAuthorized() ? toggleModal : signout}
						>
							<ListItemText>
								{!Auth.isAuthorized() ? 'Signup / Login' : 'Signout'}
							</ListItemText>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem button component={Link} to="/">
							<ListItemText>Browse recipes</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>Recipe collection</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>My creations</ListItemText>
						</ListItem>
						{['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
						<ListItem button component={Link} to="/account">
							<ListItemText>Account Settings</ListItemText>
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
		</>
	)
}

export default Navigation
