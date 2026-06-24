import React from 'react';
import { renderToString } from 'react-dom/server';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@gravity-ui/uikit';

import { App } from './components/App/App';
import { store } from './store';

export function render() {
	const queryClient = new QueryClient();
	const dehydratedState = dehydrate(queryClient);

	return renderToString(
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>
				<ThemeProvider theme="light">
					<Provider store={store}>
						<App />
					</Provider>
				</ThemeProvider>
			</HydrationBoundary>
		</QueryClientProvider>,
	);
}
