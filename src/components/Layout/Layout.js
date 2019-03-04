// @ts-nocheck
import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = props => (
	<Aux>
		<Toolbar />
		<div>Toolbar, SideDraw, Backdrop</div>
		<main className={classes.Content}>{props.children}</main>
	</Aux>
);

export default layout;
