import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				MEAL-PLANNER
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

const Signup = ({ toggleForm }) => {
	const classes = useStyles()

	const [signup, setSignup] = useState({
		data: {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		},
		errors: {}
	})

	const handleChange = (e) => {
		const data = { ...signup.data, [e.target.name]: e.target.value }
		const errors = { ...signup.errors, [e.target.name]: '' }
		setSignup({ data, errors })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		axios
			.post('/api/users/signup', signup.data)
			.then(() => {
				toggleForm()
			})
			.catch((err) => {
				setSignup({ ...signup, errors: err.response.data })
			})
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="name" // this is a guess - check it's valid
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								// autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="passwordConfirmation"
								label="Password Confirmation"
								type="password"
								id="passwordConfirmation"
								// autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}></Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link onClick={toggleForm} href="#" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	)
}

export default Signup
