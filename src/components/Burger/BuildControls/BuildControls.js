// @ts-nocheck
import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Meat', type: 'meat' }
];
const buildControls = props => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			{controls.map(ctrl => {
				return (
					<BuildControl
						key={ctrl.label}
						label={ctrl.label}
						added={() => props.addIngredient(ctrl.type)}
						removed={() => props.removeIngredient(ctrl.type)}
						disabled={props.disabled[ctrl.type]}
					/>
				);
			})}
			<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.order}>
				{props.isAuth ? 'Order Now' : 'Sign Up to Order'}
			</button>
		</div>
	);
};

export default buildControls;
