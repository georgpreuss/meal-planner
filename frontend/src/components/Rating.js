import React from 'react'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const SimpleRating = () => {
	const [value, setValue] = React.useState(2.5)

	return (
		<div>
			<Box component="fieldset" mb={3} borderColor="transparent">
				{/* <Typography component="legend">{value}</Typography> */}
				<Rating
					name="simple-controlled"
					value={value}
					precision={0.5}
					onChange={(event, newValue) => {
						setValue(newValue)
					}}
				/>
			</Box>
		</div>
	)
}

export default SimpleRating

// TODO add on hover to display avg rating, number of ratings etc.
