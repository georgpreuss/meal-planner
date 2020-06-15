import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Auth from '../lib/Auth'
import { ModalContext } from '../components/ModalContext'

const GlobalState = ({ children }) => {
	// REFACTOR LATER? - VERY WET CODE
	const [showModal, setShowModal] = useState(false)
	const [recipeModal, setRecipeModal] = useState(false)

	const [recipes, setRecipes] = useState([])
	const [loggedIn, setLoggedIn] = useState(false)
	const [profile, setProfile] = useState({})

	// TODO reload on recipes state change without reloading infinitely
	useEffect(() => {
		axios.get('api/recipes').then((resp) => {
			setRecipes(resp.data)
		})
	}, [])

	useEffect(() => {
		if (Auth.isAuthorized()) {
			console.log('getting profile')
			const userId = Auth.getUserId()
			axios.get(`api/users/${userId}`).then((resp) => {
				setProfile(resp.data)
			})
		}
	}, [loggedIn])

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
				profile
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}

export default GlobalState
