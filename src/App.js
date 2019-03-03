import React, { Component } from 'react';
import Layout from './components/Layout/Layout';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<h1>Welcome to Burger Builder</h1>
					<p>Rendered from Layout</p>
				</Layout>
			</div>
		);
	}
}

export default App;
