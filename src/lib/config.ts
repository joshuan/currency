function parseItem(item: string): number {
	return parseInt(item, 10);
}

export function parseRatios(param: string) {
	const list = param.split(',').map(parseItem);

	list.sort((a, b) => a - b);

	return list;
}

export function parseCurrencies(param: string) {
	return param.split(',');
}
