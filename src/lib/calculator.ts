export function parseCalculator(param: string) {
	const [currency, ratio, value] = param.split(':');

	return {
		value: parseInt(value, 10),
		ratio: parseFloat(ratio),
		currency,
	};
}
