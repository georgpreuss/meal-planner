import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'

import Login from './LoginForm'
import Signup from './SignupForm'

const LoginModal = ({ toggleModal, isModalOpen }) => {
	const [showLogin, setShowLogin] = useState(true)

	const toggleForm = () => {
		setShowLogin(!showLogin)
	}

	return (
		<Dialog
			open={isModalOpen}
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

export default LoginModal
