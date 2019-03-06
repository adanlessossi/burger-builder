import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};
		componentDidMount() {
			this.reqInterceptor = axios.interceptors.request.use(request => {
				this.setState({ error: null });
				return request;
			});
			this.resInterceptor = axios.interceptors.response.use(
				(response, error) => {
					this.setState({ error: error });
					return response;
				}
			);
		}
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}
		confirmErrorHandler = () => {
			this.setState({ error: null });
		};
		render() {
			return (
				<Aux>
					<Modal modalClosed={this.confirmErrorHandler} show={this.state.error}>
						<p>{this.state.error ? this.state.error.message : null}</p>
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
