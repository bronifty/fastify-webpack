import React from 'react';
import PropTypes from 'prop-types';

// Component borrowed from Dan Abramov
// https://gist.github.com/gaearon/0f1a7b12640d477d4b9efa79913b3775
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true });

		// You can also log the error to an error reporting service
		// logErrorToMyService(error, info);
		console.log({ error, info });
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong with this component.</h1>;
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	children: PropTypes.any.isRequired,
};

export default ErrorBoundary;
