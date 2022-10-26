import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocationParam, parseCurrencies, parseRatios, saveToStorage } from '../lib';
import { DEFAULT_CURRENCIES, DEFAULT_RATIOS } from '../config';

interface ConfigState {
	ratios: number[];
	currencies: string[];
}

export const initialConfigState: ConfigState = {
	ratios: getLocationParam('ratios', parseRatios, DEFAULT_RATIOS),
	currencies: getLocationParam('currencies', parseCurrencies, DEFAULT_CURRENCIES),
};

export const configSlice = createSlice({
	name: 'config',
	initialState: initialConfigState,
	reducers: {
		addRatio: (state, action: PayloadAction<number>) => {
			state.ratios.push(action.payload);
			saveToStorage('ratios', state.ratios);
		},
		removeRatio: (state, action: PayloadAction<number>) => {
			state.ratios = state.ratios.filter((ratio) => ratio !== action.payload);
			saveToStorage('ratios', state.ratios);
		},
		setRatios: (state, action: PayloadAction<number[]>) => {
			state.ratios = action.payload;
			saveToStorage('ratios', state.ratios);
		},
		addCurrency: (state, action: PayloadAction<string>) => {
			state.currencies.push(action.payload);
			saveToStorage('currencies', state.currencies);
		},
		removeCurrency: (state, action: PayloadAction<string>) => {
			state.currencies = state.currencies.filter((currency) => currency !== action.payload);
			saveToStorage('currencies', state.currencies);
		},
		setCurrencies: (state, action: PayloadAction<string[]>) => {
			state.currencies = action.payload;
			saveToStorage('currencies', state.currencies);
		},
	},
});

export const configReducer = configSlice.reducer;
export const configActions = configSlice.actions;

export const useConfig = (state: { config: ConfigState }) => state.config;

