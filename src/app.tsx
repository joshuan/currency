import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { configure } from '@gravity-ui/uikit';
import React from 'react';

import '@gravity-ui/uikit/styles/styles.css';
import './style.css';
import { QueryClientProvider, queryClient } from './lib/query';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	const body = document.querySelector('.yc-root');

	body?.classList.add('yc-root_theme_dark');
	body?.classList.remove('yc-root_theme_light');
}

configure({
	lang: 'en',
});

ReactDOM.hydrate((
	<QueryClientProvider client={queryClient}>
		<App/>
	</QueryClientProvider>
), document.getElementById('root'));
