import React, { useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

import { ModalContext } from './components/ModalContext'
import SecureRoute from './lib/SecureRoute'
import NavigationDrawer from './components/Navigation'
import LandingPage from './components/LandingPage'
import CreateRecipe from './components/CreateRecipe'

const App = () => {
	const [showModal, setShowModal] = useState(false)

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	const providerValue = useMemo(() => ({ showModal, toggleModal }), [
		showModal,
		setShowModal
	])

	return (
		<BrowserRouter>
			<ModalContext.Provider value={providerValue}>
				<NavigationDrawer>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<SecureRoute exact path="/newRecipe" component={CreateRecipe} />
					</Switch>
				</NavigationDrawer>
			</ModalContext.Provider>
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
