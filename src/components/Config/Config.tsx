import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Currency } from './Currency/Currency';
import { Ratio } from './Ratio/Ratio';
import { useConfig, configActions } from '../../store';

import './Config.css';

export function Config() {
	const { ratios, currencies } = useSelector(useConfig);
	const dispatch = useDispatch();

	const handleChangeCurrencies = React.useCallback((list: string[]) => {
		dispatch(configActions.setCurrencies(list));
	}, [dispatch]);

	const handleChangeRatios = React.useCallback((list: number[]) => {
		dispatch(configActions.setRatios(list));
	}, [dispatch]);

	return (
		<div className="Config">
			<div className="Config-Item">
				<Currency selected={currencies} onChange={handleChangeCurrencies}/>
			</div>
			<div className="Config-Item">
				<Ratio selected={ratios} onChange={handleChangeRatios}/>
			</div>
		</div>
	);
}
