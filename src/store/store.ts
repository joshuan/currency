import { configureStore } from '@reduxjs/toolkit';

import { calculatorReducer, initialCalculatorState } from './calculator';
import { configReducer, initialConfigState } from './config';

export const store = configureStore({
	reducer: {
		calculator: calculatorReducer,
		config: configReducer,
	},
	preloadedState: {
		config: initialConfigState,
		calculator: initialCalculatorState,
	},
});

export type RootState = ReturnType<typeof store['getState']>;
