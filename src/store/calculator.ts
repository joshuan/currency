import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocationParam, parseCalculator } from '../lib';

import { ICalculate } from '../types';
import { DEFAULT_CURRENCIES, DEFAULT_RATIOS } from '../config';

type CalculatorState = ICalculate;

export const initialCalculatorState: CalculatorState = getLocationParam('value', parseCalculator, {
	value: 0,
	ratio: DEFAULT_RATIOS[0],
	currency: DEFAULT_CURRENCIES[0],
});

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState: initialCalculatorState,
	reducers: {
		setValue: (state, action: PayloadAction<ICalculate>) => action.payload,
	},
});

export const calculatorReducer = calculatorSlice.reducer;
export const calculatorActions = calculatorSlice.actions;

export const useCalculator = (state: { calculator: CalculatorState }) => state.calculator;

