import React from 'react';

import { formatValue, toFixed } from './utils';

import './MoneyInput.css';

interface IMoneyInputProps {
	currency: string;
	ratio: number;
	value: number;
	tabIndex?: number;

	onChange(_value: number): void;
}

export function MoneyInput({ currency, ratio, value, onChange, tabIndex }: IMoneyInputProps) {
	const [full, decimal] = toFixed(value).split('.');
	const inputCard = React.useRef<HTMLInputElement>(null);

	const handleChange = () => {
		if (!inputCard.current) {
			return;
		}

		onChange(parseInt(inputCard.current.value.replace(/\D/gu, ''), 10));
	};

	return (
		<div className="MoneyInput">
			<input
				className="MoneyInput_Input"
				name={`${currency}-${ratio}`}
				data-currency={currency}
				data-ratio={ratio}
				type="text"
				value={formatValue(full)}
				step={1}
				tabIndex={tabIndex}
				ref={inputCard}
				onChange={handleChange}
				aria-label={`Currency ${currency} with ${ratio} ratio`}
			/>
			<span className="MoneyInput_Decimal">.{decimal}</span>
		</div>
	);
}
