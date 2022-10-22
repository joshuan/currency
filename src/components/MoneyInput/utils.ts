const ZEROS_IN_THOUSANDS = 3;
const ZEROS_IN_HUNDRED = 2;
const ZEROS_IN_TEN = 1;

export function formatValue(value: number | string): string {
	const cardValue = `${value}`.replace(/\D/gu, '');

	let i = cardValue.length - 1;
	const groups = [];

	while (i >= 0) {
		const firstDigit = cardValue[i - ZEROS_IN_HUNDRED] || '';
		const secondDigit = cardValue[i - ZEROS_IN_TEN] || '';
		const thirdDigit = cardValue[i] || '';

		groups.push(`${firstDigit}${secondDigit}${thirdDigit}`);

		i -= ZEROS_IN_THOUSANDS;
	}

	groups.reverse();

	return groups.join(' ');
}

const DECIMAL_LENGTH = 2;

export function toFixed(value: number) {
	return value.toFixed(DECIMAL_LENGTH);
}
