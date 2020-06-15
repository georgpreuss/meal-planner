import React, { useState, useEffect } from 'react'
import axios from 'axios'
import VerticalStepper from './VerticalStepper'

const RecipeView = (props) => {
	const [recipe, setRecipe] = useState({})
	const recipeId = props.match.params.recipeId

	useEffect(() => {
		axios
			.get(`/api/recipes/${recipeId}`)
			.then((resp) => {
				setRecipe(resp.data)
			})
			.catch((error) => console.log(error))
	}, [])

	return (
		<>
			<h1>{recipe.title}</h1>
			<h2>You will need...</h2>
			{/* {recipe.ingredients.map((ingredient, i) => {
				return (
					<div key={i}>
						<p>{ingredient.name}</p>
					</div>
				)
			})} */}
			<VerticalStepper steps={recipe.method} />
		</>
	)
}

export default RecipeView
