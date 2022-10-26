import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { configure, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';
import React from 'react';

import '@gravity-ui/uikit/styles/styles.css';
import './style.css';
import { QueryClientProvider, queryClient } from './lib/query';
import { Provider } from 'react-redux';
import { store } from './store';

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
