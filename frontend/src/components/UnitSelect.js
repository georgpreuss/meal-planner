import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

// TODO fix same bug as in IngredientSelect
const UnitSelect = ({ handleChangeIngredients, index, setValue }) => {
	return (
		<Autocomplete
			autoComplete
			autoHighlight
			autoSelect
			id="unit-select"
			// value={setValue}
			options={units}
			getOptionLabel={(option) => option.name}
			// onChange={onChange}
			onBlur={(e) => handleChangeIngredients(index, e)}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} name="units" />}
		/>
	)
}

const units = [
	{ name: 'Kg', id: '1' },
	{ name: 'g', id: '2' },
	{ name: 'L', id: '3' },
	{ name: 'mL', id: '4' },
	{ name: 'tbsp', id: '5' },
	{ name: 'tsp', id: '6' }
]

export default UnitSelect
