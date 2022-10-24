import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToStorage } from '../lib/storage';

interface ConfigState {
	ratios: number[];
	currencies: string[];
}

const initialState: ConfigState = {
	ratios: [],
	currencies: [],
};

export const configSlice = createSlice({
	name: 'config',
	initialState,
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

