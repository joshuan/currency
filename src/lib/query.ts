import { QueryClient } from 'react-query';

export { QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    }
});
