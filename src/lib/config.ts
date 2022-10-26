export function parseRatios(param: string) {
	const list = param.split(',').map(x => parseInt(x, 10));

	list.sort((a, b) => a - b);

	return list;
}

export function parseCurrencies(param: string) {
	return param.split(',');
}
