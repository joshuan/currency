import { configureStore } from '@reduxjs/toolkit';

import { calculatorReducer } from './calculator';
import { configReducer } from './config';
import { DEFAULT_CURRENCIES, DEFAULT_RATIOS } from '../config';

export const store = configureStore({
	reducer: {
		calculator: calculatorReducer,
		config: configReducer,
	},
	preloadedState: {
		config: {
			ratios: DEFAULT_RATIOS,
			currencies: DEFAULT_CURRENCIES,
		},
		calculator: {
			value: 0,
			ratio: DEFAULT_RATIOS[0],
			currency: DEFAULT_CURRENCIES[0],
		},
	},
});

export type RootState = ReturnType<typeof store['getState']>
