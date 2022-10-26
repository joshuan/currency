import React from 'react';
import { renderToString } from 'react-dom/server';
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { App } from './components/App/App';
import { store } from './store';

export function render() {
	const queryClient = new QueryClient();
	const dehydratedState = dehydrate(queryClient);

	return renderToString(
		<QueryClientProvider client={queryClient}>
			<Hydrate state={dehydratedState}>
				<Provider store={store}>
					<App/>
				</Provider>
			</Hydrate>
		</QueryClientProvider>,
	);
}
