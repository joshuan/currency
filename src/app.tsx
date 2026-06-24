import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
	configure,
	ThemeProvider,
	Toaster,
	ToasterComponent,
	ToasterProvider,
} from '@gravity-ui/uikit';

import { App } from './components/App/App';
import { QueryClientProvider, queryClient } from './lib';
import { store } from './store';

import '@gravity-ui/uikit/styles/styles.css';
import './style.css';

const isDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = isDark ? 'dark' : 'light';

if (isDark) {
	const body = document.querySelector('.yc-root');

	body?.classList.add('yc-root_theme_dark');
	body?.classList.remove('yc-root_theme_light');
}

configure({
	lang: 'en',
});

const toaster = new Toaster();

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<ToasterProvider toaster={toaster}>
						<App />
						<ToasterComponent />
					</ToasterProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	);
}
