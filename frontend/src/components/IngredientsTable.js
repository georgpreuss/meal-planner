import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TextField, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import IngredientSelect from './IngredientSelect'
import UnitSelect from './UnitSelect'

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
})

// function createData(name, calories, fat, carbs, protein) {
// 	return { name, calories, fat, carbs, protein }
// }

const IngredientsTable = ({
	recipe,
	setRecipe
	// ingredients,
	// handleChangeIngredients,
	// addIngredient,
	// removeIngredient
}) => {
	const classes = useStyles()
	const [ingredients, setIngredients] = useState([
		{
			name: '',
			amount: '', // needs to be number but get error messages
			units: '',
			notes: ''
		}
	])

	// TODO swap e and index in args
	const handleChangeIngredients = (index, e) => {
		const values = [...ingredients]
		values[index][e.target.name] = e.target.value
		setIngredients(values) // take this out and all instances it affects
		const data = { ...recipe.data, ingredients: values }
		setRecipe({ data })
	}

	const addIngredient = () => {
		const values = [...ingredients]
		values.push({
			name: '',
			amount: '',
			units: '',
			notes: ''
		})
		setIngredients(values)
	}

	const removeIngredient = (index) => {
		console.log('index to remove: ', index)
		const values = [...ingredients]
		values.splice(index, 1)
		console.log('values about to be set: ', values)
		setIngredients(values)
		console.log('values just set: ', values)
	}
	// const [selectedIngredient, setSelectedIngredient] = useState('')

	useEffect(() => {
		console.log('setting ingredients')
	}, [ingredients])

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Ingredients</TableCell>
						<TableCell align="right">Amount</TableCell>
						<TableCell align="right">Units</TableCell>
						<TableCell align="right">Notes</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>e.g. Onion</TableCell>
						<TableCell align="right">1</TableCell>
						<TableCell align="right"></TableCell>
						<TableCell align="right">diced</TableCell>
					</TableRow>
					{ingredients.map((ingredient, i) => {
						return (
							<TableRow key={i}>
								<TableCell>
									<IngredientSelect
										// name="name"
										// value={selectedIngredient}
										// selectedIngredient={selectedIngredient}
										// setSelectedIngredient={setSelectedIngredient}
										handleChangeIngredients={handleChangeIngredients}
										index={i}
										// onChange={() => console.log(selectedIngredient)}
									/>
								</TableCell>
								<TableCell align="right">
									<TextField
										name="amount"
										type="number"
										value={ingredient.amount}
										onChange={(e) => handleChangeIngredients(i, e)}
									/>
								</TableCell>
								<TableCell align="right">
									<UnitSelect
										// name="units"
										setValue={ingredient.units}
										handleChangeIngredients={handleChangeIngredients}
										index={i}
									/>
								</TableCell>
								<TableCell align="right">
									<TextField
										name="notes"
										value={ingredient.notes} // add equivalent to others!
										onChange={(e) => handleChangeIngredients(i, e)}
									/>
									{ingredients.length > 1 && (
										<IconButton
											onClick={() => {
												console.log('index is: ', i)
												removeIngredient(i)
											}}
										>
											<RemoveIcon />
										</IconButton>
									)}
									<IconButton onClick={addIngredient}>
										<AddIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default IngredientsTable
