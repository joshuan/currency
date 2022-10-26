export function makeParams(data: Record<string, string>) {
	if (!window.URLSearchParams) {
		throw new Error('Error environment');
	}

	return new window.URLSearchParams(data).toString();
}
