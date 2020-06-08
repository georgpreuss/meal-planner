import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

import GlobalState from './context/GlobalState'
import SecureRoute from './lib/SecureRoute'
import Navigation from './components/Navigation'
import LandingPage from './components/LandingPage'
import RecipeCollections from './components/RecipeCollections'
import AccountSettings from './components/AccountSettings'

const App = () => {
	return (
		<BrowserRouter>
			<GlobalState>
				<Navigation>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<SecureRoute exact path="/account" component={AccountSettings} />
						<SecureRoute
							exact
							path="/collections"
							component={RecipeCollections}
						/>
					</Switch>
				</Navigation>
			</GlobalState>
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
