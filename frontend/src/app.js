import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

import SecureRoute from './lib/SecureRoute'
import NavigationDrawer from './components/Navigation'
import LandingPage from './components/LandingPage'
import CreateRecipe from './components/CreateRecipe'

const App = () => {
	return (
		<BrowserRouter>
			<NavigationDrawer>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<SecureRoute exact path="/newRecipe" component={CreateRecipe} />
				</Switch>
			</NavigationDrawer>
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
