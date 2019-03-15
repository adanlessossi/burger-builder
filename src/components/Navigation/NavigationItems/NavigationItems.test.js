// @ts-nocheck
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
	adapter: new Adapter()
});

describe('<NavigationItems />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});
	it('should show two <NavigationItem /> if not authenticated', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('should show tree <NavigationItem /> if authenticated', () => {
		//wrapper = shallow(<NavigationItems isAuthenticated />);
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should show exact one <NavigationItem /> if authenticated', () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(
			wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)
		).toEqual(true);
	});
});
