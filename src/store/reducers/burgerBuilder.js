import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.7,
	bacon: 0.9,
	meat: 1.7
};

const addIngredients = (state, action) => {
	const updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1
	};
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
	return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
	const removedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
	};
	const removedIngredients = updateObject(state.ingredients, removedIngredient);
	const removedState = {
		ingredients: removedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
	return updateObject(state, removedState);
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		totalPrice: 4,
		error: false,
		building: false
	});
};

const setIngredientsFail = (state, action) => {
	return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredients(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredients(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actionTypes.SET_INGREDIENTS_FAILED:
			return setIngredientsFail(state, action);
		default:
			return state;
	}
};

export default reducer;
