import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	return (
		<>
			{steps && (
				<div className={classes.root}>
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((step, i) => (
							<Step key={i}>
								<StepLabel>{`Step ${i + 1}`}</StepLabel>
								<StepContent>
									<Typography>{step}</Typography>
									<div className={classes.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={handleBack}
												className={classes.button}
											>
												Back
											</Button>
											<Button
												variant="contained"
												color="primary"
												onClick={handleNext}
												className={classes.button}
											>
												{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length && (
						<Paper square elevation={0} className={classes.resetContainer}>
							<Typography>Enjoy!</Typography>
							<Button onClick={handleReset} className={classes.button}>
								Reset
							</Button>
						</Paper>
					)}
				</div>
			)}
		</>
	)
}

export default VerticalStepper
