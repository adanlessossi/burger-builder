import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const purchaseSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseFail = error => {
	return {
		type: actionTypes.PURCHASE_FAIL,
		error: error
	};
};

export const purchaseStart = () => {
	return {
		type: actionTypes.PURCHASE_START
	};
};

export const purchaseBurger = orderData => {
	return dispatch => {
		dispatch(purchaseStart());
		axios
			.post('/orders.json', orderData)
			.then(response => {
				console.log(response.data);
				dispatch(purchaseSuccess(response.data, orderData));
			})
			.catch(error => {
				dispatch(purchaseFail(error));
			});
	};
};
