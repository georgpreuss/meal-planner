import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

import SecureRoute from './lib/SecureRoute'
import LandingPage from './components/LandingPage'
import CreateRecipe from './components/CreateRecipe'

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<SecureRoute exact path="/newRecipe" component={CreateRecipe} />
			</Switch>
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
