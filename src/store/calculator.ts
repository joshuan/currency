import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICalculate } from '../types';

type CalculatorState = ICalculate;

const initialState: CalculatorState = {
	value: 0,
	ratio: 0,
	currency: 'USD',
};

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState,
	reducers: {
		setValue: (state, action: PayloadAction<ICalculate>) => action.payload,
	},
});

export const calculatorReducer = calculatorSlice.reducer;
export const calculatorActions = calculatorSlice.actions;

export const useCalculator = (state: { calculator: CalculatorState }) => state.calculator;

