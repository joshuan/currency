function getLocation() {
	if (!window || !window.location) {
		throw new Error('Unknown environment');
	}

	if (!window?.URL) {
		throw new Error('Error environment');
	}

	return new window.URL(window.location.href);
}

export function getLocationParam<T = unknown>(name: string, predicate: (_val: string) => T, defaultValue: T): T {
	const url = getLocation();

	if (url.searchParams.has(name)) {
		const param = url.searchParams.get(name);

		if (param !== null) {
			return predicate(param);
		}
	}

	return defaultValue;
}
