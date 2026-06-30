export type IRates = Record<string, number>;

export type ICurrency = string;

export type IRatio = number;

export type ICalculations = Record<ICurrency, Record<IRatio, number>>;

export interface ICalculate {
	currency: string;
	ratio: number;
	value: number;
}

export interface ISelected {
	currencies: ICurrency[];
	ratios: IRatio[];
}

export interface CalculatorState {
	currency: string;
	ratio: number;
	value: number;

	tempSummand: ICalculate;
	summands: ICalculate[];
	activeSummandIndex: number | 'sum' | null;
	sumCurrency: string;
	sumRatio: number;
}
