import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './Auth'

const SecureRoute = (props) => {
	return Auth.isAuthorized() ? <Route {...props} /> : <Redirect to="/login" />
}

export default SecureRoute
