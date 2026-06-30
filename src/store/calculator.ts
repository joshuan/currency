import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocationParam, parseCalculator } from '../lib';

import { ICalculate, IRates, CalculatorState } from '../types';
import { DEFAULT_CURRENCIES, DEFAULT_RATIOS } from '../config';

const initialValue = getLocationParam('value', parseCalculator, {
	value: 0,
	ratio: DEFAULT_RATIOS[0],
	currency: DEFAULT_CURRENCIES[0],
});

export const initialCalculatorState: CalculatorState = {
	currency: initialValue.currency,
	ratio: initialValue.ratio,
	value: initialValue.value,
	tempSummand: { ...initialValue },
	summands: [],
	activeSummandIndex: null,
	sumCurrency: initialValue.currency,
	sumRatio: initialValue.ratio,
};

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState: initialCalculatorState,
	reducers: {
		setValue: (state, action: PayloadAction<ICalculate>) => {
			const data = action.payload;
			if (state.activeSummandIndex === 'sum') {
				// Typing while sum is selected resets calculation to a new temporary summand
				state.summands = [];
				state.activeSummandIndex = null;
				state.tempSummand = { ...data };
				state.currency = data.currency;
				state.ratio = data.ratio;
				state.value = data.value;
			} else if (state.activeSummandIndex === null) {
				state.tempSummand = { ...data };
				state.currency = data.currency;
				state.ratio = data.ratio;
				state.value = data.value;
			} else {
				const idx = state.activeSummandIndex;
				state.summands[idx] = { ...data };
				state.currency = data.currency;
				state.ratio = data.ratio;
				state.value = data.value;
			}
		},
		addSummand: (state) => {
			const current = {
				currency: state.currency,
				ratio: state.ratio,
				value: state.value,
			};
			state.summands.push(current);
			if (state.summands.length === 1) {
				state.sumCurrency = state.currency;
				state.sumRatio = state.ratio;
			}
			state.tempSummand = {
				currency: state.currency,
				ratio: state.ratio,
				value: 0,
			};
			state.currency = state.tempSummand.currency;
			state.ratio = state.tempSummand.ratio;
			state.value = 0;
			state.activeSummandIndex = null;
		},
		removeSummand: (state, action: PayloadAction<number>) => {
			const idx = action.payload;
			state.summands.splice(idx, 1);
			if (state.activeSummandIndex === idx) {
				state.activeSummandIndex = null;
				state.currency = state.tempSummand.currency;
				state.ratio = state.tempSummand.ratio;
				state.value = state.tempSummand.value;
			} else if (
				state.activeSummandIndex !== null &&
				typeof state.activeSummandIndex === 'number' &&
				state.activeSummandIndex > idx
			) {
				state.activeSummandIndex -= 1;
			}
		},
		selectSummand: (state, action: PayloadAction<number>) => {
			const idx = action.payload;
			if (idx >= 0 && idx < state.summands.length) {
				state.activeSummandIndex = idx;
				state.currency = state.summands[idx].currency;
				state.ratio = state.summands[idx].ratio;
				state.value = state.summands[idx].value;
			}
		},
		selectActiveSummand: (state) => {
			state.activeSummandIndex = null;
			state.currency = state.tempSummand.currency;
			state.ratio = state.tempSummand.ratio;
			state.value = state.tempSummand.value;
		},
		selectSum: (state, action: PayloadAction<{ rates: IRates }>) => {
			const { rates } = action.payload;
			let baseValue = 0;
			for (const summand of state.summands) {
				const rate = rates[summand.currency];
				if (rate) {
					baseValue += summand.value / summand.ratio / rate;
				}
			}
			if (state.activeSummandIndex === null) {
				const rate = rates[state.currency];
				if (rate) {
					baseValue += state.value / state.ratio / rate;
				}
			}
			const sumValue =
				baseValue * (rates[state.sumCurrency] || 1) * state.sumRatio;

			state.activeSummandIndex = 'sum';
			state.currency = state.sumCurrency;
			state.ratio = state.sumRatio;
			state.value = sumValue;
		},
		setSumCurrency: (
			state,
			action: PayloadAction<{ currency: string; rates: IRates }>,
		) => {
			const { currency, rates } = action.payload;
			state.sumCurrency = currency;
			if (state.activeSummandIndex === 'sum') {
				let baseValue = 0;
				for (const summand of state.summands) {
					const rate = rates[summand.currency];
					if (rate) {
						baseValue += summand.value / summand.ratio / rate;
					}
				}
				const sumValue = baseValue * (rates[currency] || 1) * state.sumRatio;
				state.value = sumValue;
				state.currency = currency;
			}
		},
		setSumRatio: (
			state,
			action: PayloadAction<{ ratio: number; rates: IRates }>,
		) => {
			const { ratio, rates } = action.payload;
			state.sumRatio = ratio;
			if (state.activeSummandIndex === 'sum') {
				let baseValue = 0;
				for (const summand of state.summands) {
					const rate = rates[summand.currency];
					if (rate) {
						baseValue += summand.value / summand.ratio / rate;
					}
				}
				const sumValue = baseValue * (rates[state.sumCurrency] || 1) * ratio;
				state.value = sumValue;
				state.ratio = ratio;
			}
		},
		clearCalculator: (state) => {
			state.summands = [];
			state.activeSummandIndex = null;
			state.tempSummand = {
				currency: DEFAULT_CURRENCIES[0],
				ratio: DEFAULT_RATIOS[0],
				value: 0,
			};
			state.currency = DEFAULT_CURRENCIES[0];
			state.ratio = DEFAULT_RATIOS[0];
			state.value = 0;
			state.sumCurrency = DEFAULT_CURRENCIES[0];
			state.sumRatio = DEFAULT_RATIOS[0];
		},
	},
});

export const calculatorReducer = calculatorSlice.reducer;
export const calculatorActions = calculatorSlice.actions;

export const useCalculator = (state: { calculator: CalculatorState }) =>
	state.calculator;
