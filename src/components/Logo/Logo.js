// @ts-nocheck
import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = props => {
	return (
		<div className={classes.Logo}>
			<img src={burgerLogo} alt='King of Burgers' />
		</div>
	);
};

export default logo;
