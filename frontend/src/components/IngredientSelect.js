import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const IngredientSelect = ({ handleChangeIngredients, index }) => {
	const [selectedIngredient, setSelectedIngredient] = useState({})

	// TODO fix bug where typing to autocomplete doesn't save full string but just what was typed
	return (
		<Autocomplete
			autoComplete // enables to complete string on down arrow
			autoHighlight // combination of autoHighlight and autoSelect allows user to tab to fill in only option
			autoSelect
			// blurOnSelect // with this enabled clicking option won't save to state
			id="ingredient-select"
			options={DUMMY_INGREDIENTS}
			getOptionLabel={(option) => (option.name ? option.name : '')}
			value={selectedIngredient}
			// onBlur is A BIT OF A HACK
			onBlur={(e) => {
				// console.log('blurred e.target: ', e.target)
				handleChangeIngredients(index, e)
			}}
			// below isn't working properly - why can't I pass string as value in line 17?
			// do I need getOptionSelected prop?
			onChange={(e, value) => {
				console.log('value is: ', value)
				setSelectedIngredient(value)
			}}
			style={{ width: 300 }}
			renderInput={(params) => (
				<TextField
					{...params}
					// onChange={(e) => setSelectedIngredient(e.target.value)}
					name="name"
				/>
			)}
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
