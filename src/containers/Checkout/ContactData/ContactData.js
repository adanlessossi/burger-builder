// @ts-nocheck
import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			zipCode: '',
			city: ''
		},
		loading: false
	};

	orderHanler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Adam Less Ozi',
				address: {
					street: 'Some street 1',
					zipCode: '4785',
					city: 'Futuryx'
				},
				emai: 'adam.less@futuryx.com'
			},
			deviveryMethod: 'FastPost'
		};

		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loding: false });
			})
			.catch(error => {
				console.log(error);
				this.setState({ loding: false });
			});
	};

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form>
					<input
						className={classes.Input}
						type='text'
						name='name'
						placeholder='Your Name'
					/>
					<input
						className={classes.Input}
						type='text'
						name='email'
						placeholder='Your Email'
					/>
					<input
						className={classes.Input}
						type='text'
						name='street'
						placeholder='Your Street'
					/>
					<input
						className={classes.Input}
						type='text'
						name='zipCode'
						placeholder='Your ZIP Code'
					/>
					<input
						className={classes.Input}
						type='text'
						name='city'
						placeholder='Your City'
					/>
					<Button btnType='Success' clicked={this.orderHanler}>
						Order
					</Button>
				</form>
			</div>
		);
	}
}

export default ContactData;
