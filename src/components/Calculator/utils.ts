import { IRates, ISelected, ICalculate, ICalculations } from '../../types';

export function calculateValues(rates: IRates, selected: ISelected, update: ICalculate): ICalculations {
	const baseValue = update.value / update.ratio / rates[update.currency];
	const result: ICalculations = {};

	for (const currency of selected.currencies) {
		result[currency] = {};

		for (const ratio of selected.ratios) {
			result[currency][ratio] = baseValue * rates[currency] * ratio;
		}
	}

	return result;
}
