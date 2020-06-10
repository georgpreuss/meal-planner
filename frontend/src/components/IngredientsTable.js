import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TextField } from '@material-ui/core'

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

const IngredientsTable = ({ ingredients, handleChangeIngredients }) => {
	const classes = useStyles()
	// const [selectedIngredient, setSelectedIngredient] = useState('')

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
										name="name"
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
										// value={ingredient.amount}
										name="amount"
										onChange={(e) => handleChangeIngredients(i, e)}
									/>
								</TableCell>
								<TableCell align="right">
									<UnitSelect />
								</TableCell>
								<TableCell align="right">
									<TextField
										name="notes"
										onChange={(e) => handleChangeIngredients(i, e)}
									/>
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
