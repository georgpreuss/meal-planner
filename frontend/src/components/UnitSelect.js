import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const UnitSelect = ({ onChange }) => {
	return (
		<Autocomplete
			id="unit-select"
			options={units}
			getOptionLabel={(option) => option.name}
			onChange={onChange}
			// style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} />}
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
