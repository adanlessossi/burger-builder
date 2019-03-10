// @ts-nocheck
import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Zip Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your City'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'email',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fast-Delivery' },
						{ value: 'cheapest', displayValue: 'Cheap-Delivery' }
					]
				},
				valid: true,
				validation: {},
				value: 'cheapest'
			}
		},
		loading: false,
		formIsValid: false
	};

	orderHanler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let inputIdentifier in this.state.orderForm) {
			formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		};

		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loding: false });
				this.props.history.push('/');
			})
			.catch(error => {
				console.log(error);
				this.setState({ loding: false });
			});
	};

	checkValidity = (value, rule) => {
		let isValid = true;
		if (!rule) {
			return true;
		}
		if (rule.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rule.minLength) {
			isValid = value.length >= rule.minLength && isValid;
		}
		if (rule.maxLength) {
			isValid = value.length <= rule.maxLength && isValid;
		}
		return isValid;
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updateFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updateFormElement.value = event.target.value;
		updateFormElement.valid = this.checkValidity(
			updateFormElement.value,
			updateFormElement.validation
		);
		updateFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updateFormElement;
		let formIsValid = true;
		for (let inputIdentifier in updateFormElement) {
			formIsValid = updateFormElement[inputIdentifier].valid && formIsValid;
		}
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({ id: key, config: this.state.orderForm[key] });
		}
		let form = (
			<form onSubmit={this.orderHanler}>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						touched={formElement.config.touched}
						shouldValidate={formElement.config.validation}
						changed={event => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType='Success' disabled={!this.state.formIsValid}>
					Order
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
