const isAvailable = typeof localStorage !== 'undefined';

export function saveToStorage(key: string, value: object): void {
	if (isAvailable) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

export function getFromStorage<T extends object>(
	key: string,
	defaultValue: T
): T {
	let value = null;

	if (isAvailable) {
		value = localStorage.getItem(key);
	}

	return value ? JSON.parse(value) : defaultValue;
}
