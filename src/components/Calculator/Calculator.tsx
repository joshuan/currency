import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Hr } from '../Hr/Hr';
import { Container } from '../Container/Container';
import { Table } from '../Table/Table';
import { Config } from '../Config/Config';
import { calculateValues } from './utils';
import { ICalculate, ICurrency, IRates } from '../../types';
import {
	calculatorActions,
	configActions,
	useCalculator,
	useConfig,
} from '../../store';

import './Calculator.css';

interface ICalculatorProps {
	loading: boolean;
	rates: IRates;
}

export function Calculator(props: ICalculatorProps) {
	const { currencies, ratios } = useSelector(useConfig);
	const { currency, ratio, value } = useSelector(useCalculator);
	const dispatch = useDispatch();

	const handleChangeValue = (data: ICalculate) => {
		dispatch(calculatorActions.setValue(data));
	};

	const values = calculateValues(
		props.rates,
		{ currencies, ratios },
		{ currency, ratio, value },
	);

	const handleRemoveCurrency = (currencyToRemove: ICurrency) => {
		dispatch(configActions.removeCurrency(currencyToRemove));
		if (currency === currencyToRemove) {
			const remaining = currencies.filter((c) => c !== currencyToRemove);
			if (remaining.length > 0) {
				dispatch(
					calculatorActions.setValue({
						currency: remaining[0],
						ratio,
						value: values[remaining[0]] ? values[remaining[0]][ratio] : value,
					}),
				);
			}
		}
	};

	return (
		<div className="Calculator">
			<Container>
				<Table
					loading={props.loading}
					currencies={currencies}
					ratios={ratios}
					values={values}
					onChange={handleChangeValue}
					onRemoveCurrency={handleRemoveCurrency}
				/>
			</Container>
			<Hr />
			<Container>
				<Config />
			</Container>
		</div>
	);
}
