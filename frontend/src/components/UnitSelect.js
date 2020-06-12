import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

// TODO address error message on input clear - doesn't happen with arr of strings as options (and no getOptionLabel)

const UnitSelect = ({ handleChangeIngredients, index, value }) => {
	const [selectedUnit, setSelectedUnit] = useState('')
	const [inputValue, setInputValue] = useState('')

	return (
		<Autocomplete
			autoComplete
			autoHighlight
			autoSelect
			id="unit-select"
			options={units.map((unit) => unit.name)} // clear icon appears when I do this but disappears when I don't map and pass the entire object
			// getOptionLabel={(option) => option.name}
			value={value}
			onChange={(e, newValue) => {
				setSelectedUnit(newValue)
				const newE = {
					...e,
					target: { ...e.target, value: newValue, name: 'units' }
				}
				handleChangeIngredients(index, newE)
			}}
			inputValue={inputValue}
			onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} />}
		/>
	)
}

// TODO replace with actual array of measurement units
const units = [
	{ name: 'Kg', id: '1' },
	{ name: 'g', id: '2' },
	{ name: 'L', id: '3' },
	{ name: 'mL', id: '4' },
	{ name: 'tbsp', id: '5' },
	{ name: 'tsp', id: '6' }
]

export default UnitSelect
