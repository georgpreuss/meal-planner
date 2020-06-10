import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const IngredientSelect = ({ handleChangeIngredients, index }) => {
	const [selectedIngredient, setSelectedIngredient] = useState({})

	return (
		<Autocomplete
			id="ingredient-select"
			options={DUMMY_INGREDIENTS}
			getOptionLabel={(option) => (option.name ? option.name : '')}
			value={selectedIngredient}
			onBlur={(e) => {
				// console.log('blurred e.target: ', e.target)
				handleChangeIngredients(index, e)
			}}
			onChange={(e, value) => {
				console.log('e.target.value: ', e.target.value)
				setSelectedIngredient(value)
			}}
			// style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} name="name" />}
		/>
	)
}

// TODO replace with real data once ready
const DUMMY_INGREDIENTS = [
	{ name: 'Banana', id: '1', value: 'Banana' },
	{ name: 'Apple', id: '2', value: 'Apple' },
	{ name: 'Mango', id: '3', value: 'Mango' }
]

export default IngredientSelect
