const URLParams = window?.URLSearchParams;

export function makeParams(data: Record<string, string>) {
	if (!URLParams) {
		throw new Error('Undefined URL search params');
	}

	return new window.URLSearchParams(data).toString();
}
