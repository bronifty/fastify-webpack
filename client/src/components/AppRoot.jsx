/* @flow */
import * as React from 'react'; // importing as a namespace gives access to React's utility types
import '../styles/normalize.global.css';
import ErrorBoundary from 'components/basics/ErrorBoundary';
import BitcoinTicker from 'components/BitcoinTicker';

import { hot } from 'react-hot-loader';

import {
	BrowserRouter as Router, // <-- to use history API instead of hash url pattern
	// HashRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom';

const AppRoot = () => (
	<Router>
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">home</Link>
					</li>

					<li>
						<Link to="/bitcoin">bitcoin ticker</Link>
					</li>
				</ul>
			</nav>

			<hr />

			<Switch>
				<Route exact path="/">
					<div>
						<p>This is the home page.</p>
					</div>
				</Route>

				<Route path="/bitcoin">
					<div>
						<ErrorBoundary>
							<BitcoinTicker />
						</ErrorBoundary>
					</div>
				</Route>

				<Route>
					<div>
						404
					</div>
				</Route>
			</Switch>
		</div>
	</Router>
);

// export default AppRoot;
export default hot(module)(AppRoot);
