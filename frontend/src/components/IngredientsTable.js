import React from 'react'
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

const IngredientsTable = ({
	ingredients,
	handleChangeIngredients,
	addIngredient,
	removeIngredient
}) => {
	const classes = useStyles()

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
										handleChangeIngredients={handleChangeIngredients}
										index={i}
										value={ingredient.name}
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
										value={ingredient.units}
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
										<IconButton onClick={() => removeIngredient(i)}>
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
