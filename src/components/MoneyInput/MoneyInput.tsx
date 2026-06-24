import React, { useState, useEffect, useRef } from 'react';

import { formatValue, toFixed } from './utils';

import './MoneyInput.css';

interface IMoneyInputProps {
	currency: string;
	ratio: number;
	value: number;
	tabIndex?: number;

	onChange(_value: number): void;
}

export function MoneyInput({
	currency,
	ratio,
	value,
	onChange,
	tabIndex,
}: IMoneyInputProps) {
	const [full, decimal] = toFixed(value).split('.');
	const [isFocused, setIsFocused] = useState(false);
	const [localValue, setLocalValue] = useState('');
	const inputCard = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!isFocused) {
			setLocalValue(value === 0 ? '' : value.toString());
		}
	}, [value, isFocused]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const filteredValue = rawValue.replace(/[^0-9.,]/g, '');
		setLocalValue(filteredValue);

		const cleanValue = filteredValue.replace(',', '.');
		const parsed = parseFloat(cleanValue);
		if (!isNaN(parsed)) {
			onChange(parsed);
		} else if (filteredValue === '') {
			onChange(0);
		}
	};

	const handleFocus = () => {
		setIsFocused(true);
		setLocalValue(value === 0 ? '' : value.toString());
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<div className="MoneyInput">
			<input
				className="MoneyInput_Input"
				name={`${currency}-${ratio}`}
				data-currency={currency}
				data-ratio={ratio}
				type="text"
				value={isFocused ? localValue : formatValue(full)}
				step={1}
				tabIndex={tabIndex}
				ref={inputCard}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				aria-label={`Currency ${currency} with ${ratio} ratio`}
			/>
			{!isFocused && <span className="MoneyInput_Decimal">.{decimal}</span>}
		</div>
	);
}
