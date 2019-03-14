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

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseStart());
		axios
			.post('/orders.json?auth=' + token, orderData)
			.then(response => {
				console.log(response.data);
				dispatch(purchaseSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = token => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios
			.get('/orders.json?auth=' + token)
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err));
			});
	};
};
