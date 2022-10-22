import React from 'react';

import './Config.css';

import { Currency } from './Currency/Currency';
import { Ratio } from './Ratio/Ratio';

interface IConfigProps {
	currencies: string[];
	ratios: number[];

	onChangeCurrencies(_list: string[]): void;

	onChangeRatios(_list: number[]): void;
}

export function Config({ currencies = [], ratios = [], onChangeCurrencies, onChangeRatios }: IConfigProps) {
	return (
		<div className="Config">
			<div className="Config-Item">
				<Currency selected={currencies} onChange={onChangeCurrencies}/>
			</div>
			<div className="Config-Item">
				<Ratio selected={ratios} onChange={onChangeRatios}/>
			</div>
		</div>
	);
}
