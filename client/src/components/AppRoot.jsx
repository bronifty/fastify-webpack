/* @flow */
import * as React from 'react'; // importing as a namespace gives access to React's utility types
import './AppRoot.module.css';
import '../styles/normalize.global.css';

import {
	BrowserRouter as Router, // <-- to use history API instead of hash url pattern
	// HashRouter as Router,
	// Switch,
	// Route,
	// Link,
} from 'react-router-dom';

const AppRoot = () => (
	<Router>
		<div styleName="wrapper">
			<p>I am AppRoot.</p>
		</div>
	</Router>
);

export default AppRoot;
