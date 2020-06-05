import React, { useState, useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'

import { ModalContext } from './ModalContext'
import Login from './LoginForm'
import Signup from './SignupForm'

const SignupLoginModal = () => {
	const [showLogin, setShowLogin] = useState(true)

	const { showModal, toggleModal } = useContext(ModalContext)

	const toggleForm = () => {
		setShowLogin(!showLogin)
	}

	return (
		<Dialog
			open={showModal}
			onClose={toggleModal}
			aria-labelledby="form-dialog-title"
		>
			{showLogin ? (
				<Login toggleForm={toggleForm} showLogin={showLogin} />
			) : (
				<Signup toggleForm={toggleForm} showLogin={showLogin} />
			)}
		</Dialog>
	)
}

export default SignupLoginModal
