import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import StepButton from '@material-ui/core/StepButton'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	actionsContainer: {
		marginBottom: theme.spacing(2)
	},
	resetContainer: {
		padding: theme.spacing(3)
	}
}))

const VerticalStepper = ({ steps }) => {
	const classes = useStyles()
	const [activeStep, setActiveStep] = useState(0)

	const handleStep = (step) => {
		setActiveStep(step)
	}

	const isStepComplete = (step) => {
		return activeStep > step
	}

	return (
		<>
			{steps && (
				<div className={classes.root}>
					<Stepper nonLinear activeStep={activeStep} orientation="vertical">
						{steps.map((step, i) => (
							<Step key={i}>
								<StepButton
									onClick={() => handleStep(i)}
									completed={isStepComplete(i)}
								>
									{`Step ${i + 1}`}
									{/* {step} */}
								</StepButton>
								<StepContent>{step}</StepContent>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length - 1 && (
						<Paper square elevation={0} className={classes.resetContainer}>
							<Typography>Enjoy!</Typography>
						</Paper>
					)}
				</div>
			)}
		</>
	)
}

export default VerticalStepper
