import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};

export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

export const setIngredientsFailed = () => {
	return {
		type: actionTypes.SET_INGREDIENTS_FAILED
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: {
			salad: ingredients.salad,
			bacon: ingredients.bacon,
			cheese: ingredients.cheese,
			meat: ingredients.meat
		}
	};
};

export const initIngredients = () => {
	return dispatch => {
		axios
			.get('https://burger-builder-602c9.firebaseio.com/ingredients.json')
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(error => {
				dispatch(setIngredientsFailed());
			});
	};
};
