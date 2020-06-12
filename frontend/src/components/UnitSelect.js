import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

// TODO address error message on input clear - doesn't happen with arr of strings as options (and no getOptionLabel)

const UnitSelect = ({ handleChangeIngredients, index }) => {
	const [selectedUnit, setSelectedUnit] = useState('')
	const [inputValue, setInputValue] = useState('')

	return (
		<Autocomplete
			autoComplete
			autoHighlight
			autoSelect
			id="unit-select"
			options={units}
			getOptionLabel={(option) => option.name}
			value={selectedUnit.name}
			onChange={(e, newValue) => {
				setSelectedUnit(newValue.name)
				const newE = {
					...e,
					target: { ...e.target, value: newValue.name, name: 'units' }
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
