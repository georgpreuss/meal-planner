import React, { useState } from 'react'

import { ModalContext } from '../components/ModalContext'

const GlobalState = ({ children }) => {
	// REFACTOR LATER? - VERY WET CODE
	const [showModal, setShowModal] = useState(false)
	const [recipeModal, setRecipeModal] = useState(false)

	const [loggedIn, setLoggedIn] = useState(false)

	// const [showModal, setShowModal] = useState({
	//   loginSignup: false,
	//   promptSignup: false,
	//   recipeModal: false,
	//   shareModal: false
	// })

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
				setLoggedIn
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}

export default GlobalState
