import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

// TODO address error message on input clear - doesn't happen with arr of strings as options (and no getOptionLabel)

const IngredientSelect = ({ handleChangeIngredients, index }) => {
	const [selectedIngredient, setSelectedIngredient] = useState('')
	const [inputValue, setInputValue] = useState('')

	return (
		<Autocomplete
			autoComplete // enables to complete string on down arrow
			// combination of autoHighlight and autoSelect allows user to tab to fill in only option
			autoHighlight
			autoSelect
			id="ingredient-select"
			options={DUMMY_INGREDIENTS}
			getOptionLabel={(option) => (option.name ? option.name : '')}
			value={selectedIngredient.name}
			onChange={(e, newValue) => {
				setSelectedIngredient(newValue.name)
				// needed to send entire string (manually entered plus auto completed remaining string) in e
				const newE = {
					...e,
					target: { ...e.target, value: newValue.name, name: 'name' }
				}
				handleChangeIngredients(index, newE)
			}}
			inputValue={inputValue}
			onInputChange={(e, newInputValue) => {
				setInputValue(newInputValue)
			}}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} />}
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
