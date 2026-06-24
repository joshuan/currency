import React from 'react';

import { Button, IButtonClickEvent } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Checkbox } from '../../Checkbox/Checkbox';
import { ConfigItem } from '../Item/Item';
import { DEFAULT_RATIOS } from '../../../config';

import './Ratio.css';

function sort(list: number[]) {
	return list.sort((a, b) => a - b);
}

interface IRatioProps {
	selected: number[];

	onChange(_list: number[]): void;
}

export function Ratio({ selected = [], onChange }: IRatioProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleUnchecked = React.useCallback(
		(ratio: number) => {
			onChange(selected.filter((item) => item !== ratio));
		},
		[onChange, selected],
	);

	const handleClear = React.useCallback(
		(event: IButtonClickEvent) => {
			event.preventDefault();
			onChange(DEFAULT_RATIOS);
		},
		[onChange],
	);

	const [searchValue, setSearchValue] = React.useState('');

	const handleSearch = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSearchValue(event.target.value);
		},
		[setSearchValue],
	);
	const handleSearchApply = React.useCallback(
		(event: React.SyntheticEvent) => {
			event.preventDefault();

			const cleanValue = searchValue.replace(',', '.');
			
			// Validate format: only allow positive integers or decimals (e.g. 12, 0.64)
			if (!/^[0-9]+(\.[0-9]+)?$/.test(cleanValue)) {
				return;
			}

			const value = parseFloat(cleanValue);

			if (isNaN(value) || value <= 0 || selected.includes(value)) {
				return;
			}

			onChange(sort([...selected, value]));
			setSearchValue('');
			inputRef.current?.focus();
		},
		[setSearchValue, searchValue, selected, onChange],
	);

	return (
		<ConfigItem
			title="Ratio"
			filter={
				<form className="Config__Ratio_Form" onSubmit={handleSearchApply}>
					<Input
						controlRef={inputRef}
						className="Config__Ratio_Input"
						type="search"
						value={searchValue}
						onChange={handleSearch}
						placeholder="Ration value"
					/>
					<Button type="submit">Add</Button>
				</form>
			}
			onClear={handleClear}
		>
			{selected.map((ratio) => (
				<Checkbox
					key={ratio}
					className="Config__Ratio_Checkbox"
					checked
					onChange={() => handleUnchecked(ratio)}
				>
					{ratio}
				</Checkbox>
			))}
		</ConfigItem>
	);
}
