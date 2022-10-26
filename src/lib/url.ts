const URLSearchParams = window?.URLSearchParams;

export function makeParams(data: Record<string, string>) {
	if (!URLSearchParams) {
		throw new Error('Error environment');
	}

	return new window.URLSearchParams(data).toString();
}
