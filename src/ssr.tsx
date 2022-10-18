import React from 'react';
import { renderToString } from 'react-dom/server';
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './components/App/App';

export function render() {
    const queryClient = new QueryClient();
    const dehydratedState = dehydrate(queryClient)

    return renderToString(
        <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
                <App />
            </Hydrate>
        </QueryClientProvider>
    );
}
