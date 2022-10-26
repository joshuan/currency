import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configure, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';

import { App } from './components/App/App';
import { QueryClientProvider, queryClient } from './lib';
import { store } from './store';

import '@gravity-ui/uikit/styles/styles.css';
import './style.css';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	const body = document.querySelector('.yc-root');

	body?.classList.add('yc-root_theme_dark');
	body?.classList.remove('yc-root_theme_light');
}

configure({
	lang: 'en',
});

ReactDOM.hydrate((
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<ToasterProvider>
				<App/>
				<ToasterComponent />
			</ToasterProvider>
		</QueryClientProvider>
	</Provider>
), document.getElementById('root'));
