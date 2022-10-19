import { QueryClient } from '@tanstack/react-query';

export { useQuery, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			refetchIntervalInBackground: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});
