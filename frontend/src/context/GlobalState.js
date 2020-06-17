import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Auth from '../lib/Auth'
import { ModalContext } from '../components/ModalContext'

const GlobalState = ({ children }) => {
	// REFACTOR LATER? - VERY WET CODE
	const [showModal, setShowModal] = useState(false)
	const [recipeModal, setRecipeModal] = useState(false)

	// store recipes retrieved from database and update here
	const [recipes, setRecipes] = useState([])
	// store profile retrieved from database and update here
	const [profile, setProfile] = useState({})
	// store logged in state here
	const [loggedIn, setLoggedIn] = useState(false)

	// grab all recipes off database as soon as you access the website
	useEffect(() => {
		axios.get('api/recipes').then((resp) => {
			setRecipes(resp.data)
		})
	}, []) // only get it once - look into socket.io implementation to push changes from database?

	// grap user profile on login
	useEffect(() => {
		if (Auth.isAuthorized()) {
			const userId = Auth.getUserId()
			axios.get(`api/users/${userId}`).then((resp) => {
				setProfile(resp.data)
			})
		}
	}, [loggedIn]) // TODO check you need this dependency

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	const toggleRecipe = () => {
		setRecipeModal(!recipeModal)
	}

	// TODO check if useMemo hook necessary
	// const providerValue = useMemo(() => ({ showModal }), [ showModal])
	// set value={providerValue} below

	return (
		<ModalContext.Provider
			value={{
				showModal,
				toggleModal,
				recipeModal,
				toggleRecipe,
				loggedIn,
				setLoggedIn,
				recipes,
				setRecipes,
				profile,
				setProfile // TODO add newRecipes and SetNewRecipes
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}

export default GlobalState
