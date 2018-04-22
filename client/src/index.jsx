/* global document */
/* @flow */
import * as React from 'react'; // importing as a namespace gives access to React's utility types
import { render as renderReactToDOM } from 'react-dom';

import AppRoot from 'components/AppRoot';

const renderTarget = document.getElementById('react-root');
if (renderTarget == null) throw new Error('Render target not found');

const renderApp = () => {
	// eslint-disable-next-line no-console
	console.log('Rendering React app...');

	renderReactToDOM(
		<AppRoot />,

		// Render to this DOM element.
		renderTarget,
	);
};

renderApp();
