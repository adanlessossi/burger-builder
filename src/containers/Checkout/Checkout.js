import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: 0
	};

	componentWillMount() {
		let search = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let p of search) {
			console.log(p[0] + ': ' + p[1]);
			if (p[0] === 'price') {
				price = +p[1];
			} else {
				ingredients[p[0]] = +p[1];
			}
		}
		this.setState({ ingredients: ingredients, totalPrice: price });
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					render={() => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
