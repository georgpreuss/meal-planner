import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles'
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
import InputBase from '@material-ui/core/InputBase'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore'
import SearchIcon from '@material-ui/icons/Search'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'

import { ModalContext } from './ModalContext'
import SignupLoginModal from './SignupLoginModal'
import Auth from '../lib/Auth'

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
	const { toggleModal } = useContext(ModalContext)
	const [loggedIn, setLoggedIn] = useState(true) // not using loggedIn at the moment... move into useContext as this code won't allow multiple login logouts

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer)
	}

	const signout = () => {
		Auth.logout()
		setLoggedIn(false) // bit of a cheat to get 'Signup / Login' to reappear
		history.push('/')
	}

	const [anchorEl, setAnchorEl] = React.useState(null)
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

	const isMenuOpen = Boolean(anchorEl)

	useEffect(() => {
		console.log('oi: ', anchorEl)
	}, [anchorEl])

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget)
	}

	const menuId = 'primary-search-account-menu'
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	)

	const mobileMenuId = 'primary-search-account-menu-mobile'
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	)

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
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton aria-label="show 4 new mails" color="inherit">
								<Badge badgeContent={4} color="secondary">
									<MailIcon />
								</Badge>
							</IconButton>
							<IconButton
								aria-label="show 17 new notifications"
								color="inherit"
							>
								<Badge badgeContent={17} color="secondary">
									<NotificationsIcon />
								</Badge>
							</IconButton>
							<IconButton
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
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
						<ListItem button>
							<ListItemIcon>
								<LocalLibraryIcon />
							</ListItemIcon>
							<ListItemText>Recipe collections</ListItemText>
						</ListItem>
						<ListItem button>
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
						<ListItem button>
							<ListItemIcon>
								<SearchIcon />
							</ListItemIcon>
							<ListItemText>Search recipes</ListItemText>
						</ListItem>
						{/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))} */}
						<ListItem button component={Link} to="/account">
							<ListItemIcon>
								<AccountBoxIcon />
							</ListItemIcon>
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
