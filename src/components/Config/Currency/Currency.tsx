import React from 'react';

import { IButtonClickEvent } from '../../Button/Button';
import { Flag } from '../../Flag/Flag';
import { Input } from '../../Input/Input';
import { Checkbox } from '../../Checkbox/Checkbox';
import { ConfigItem } from '../Item/Item';
import { DEFAULT_CURRENCIES } from '../../../config';
import { countries } from '../../../lib';

import './Currency.css';

interface IFilterByCode {
	currencyCode: string;
}

function filterByCode(selected: string[]) {
	const lowerSelected = selected.map((item) => item.toLowerCase());

	return ({ currencyCode }: IFilterByCode) =>
		lowerSelected.includes(currencyCode.toLowerCase());
}

interface IFilterByCodeAndName {
	name: string;
	currencyCode: string;
}

function filterByCodeAndName(searchValue: string) {
	const lowerSearchValue = searchValue.toLowerCase();

	return ({ name, currencyCode }: IFilterByCodeAndName) =>
		name.toLowerCase().includes(lowerSearchValue) ||
		currencyCode.toLowerCase().includes(lowerSearchValue);
}

interface ICurrencyProps {
	selected: string[];

	onChange(_list: string[]): void;
}

export function Currency({ selected = [], onChange }: ICurrencyProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const pendingFocusRef = React.useRef<
		{ type: 'checkbox'; index: number } | { type: 'input' } | null
	>(null);

	const [searchValue, setSearchValue] = React.useState('');

	React.useLayoutEffect(() => {
		if (pendingFocusRef.current) {
			const action = pendingFocusRef.current;
			pendingFocusRef.current = null;

			if (action.type === 'input') {
				inputRef.current?.focus();
			} else if (action.type === 'checkbox') {
				const checkboxes =
					containerRef.current?.querySelectorAll<HTMLInputElement>(
						'input[type="checkbox"]',
					);
				if (checkboxes && checkboxes.length > action.index) {
					checkboxes[action.index].focus();
				} else {
					inputRef.current?.focus();
				}
			}
		}
	});

	const handleChange = React.useCallback(
		(name: string, checked: boolean) => {
			if (!checked && searchValue === '') {
				const checkboxes = Array.from(
					containerRef.current?.querySelectorAll<HTMLInputElement>(
						'input[type="checkbox"]',
					) || [],
				);
				const activeElement = document.activeElement as HTMLInputElement;
				if (activeElement && checkboxes.includes(activeElement)) {
					const index = checkboxes.indexOf(activeElement);
					if (checkboxes.length > 1) {
						if (index < checkboxes.length - 1) {
							pendingFocusRef.current = { type: 'checkbox', index };
						} else {
							pendingFocusRef.current = { type: 'checkbox', index: index - 1 };
						}
					} else {
						pendingFocusRef.current = { type: 'input' };
					}
				}
			}

			if (checked) {
				onChange([...selected, name]);
			} else {
				onChange(selected.filter((item) => item !== name));
			}
		},
		[onChange, selected, searchValue],
	);

	const handleClear = React.useCallback(
		(event: IButtonClickEvent) => {
			onChange(DEFAULT_CURRENCIES);
			event.preventDefault();
		},
		[onChange],
	);

	const handleSearch = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSearchValue(event.target.value);
		},
		[setSearchValue],
	);

	const handleInputKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				const filteredCountries = countries.filter(
					searchValue === ''
						? filterByCode(selected)
						: filterByCodeAndName(searchValue),
				);
				const uniqueCurrencies = Array.from(
					new Set(filteredCountries.map((c) => c.currencyCode)),
				);

				if (uniqueCurrencies.length === 1) {
					const currencyCode = uniqueCurrencies[0];
					const isAlreadySelected = selected.includes(currencyCode);
					if (isAlreadySelected) {
						onChange(selected.filter((item) => item !== currencyCode));
					} else {
						onChange([...selected, currencyCode]);
					}
					setSearchValue('');
					inputRef.current?.focus();
				}
			} else if (
				event.key === 'ArrowDown' ||
				(event.key === 'Tab' && !event.shiftKey)
			) {
				const checkboxes =
					containerRef.current?.querySelectorAll<HTMLInputElement>(
						'input[type="checkbox"]',
					);
				if (checkboxes && checkboxes.length > 0) {
					event.preventDefault();
					checkboxes[0].focus();
				}
			}
		},
		[searchValue, selected, onChange],
	);

	const handleListKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const activeElement = document.activeElement as HTMLInputElement;
			if (!activeElement || activeElement.type !== 'checkbox') {
				return;
			}

			const checkboxes = Array.from(
				containerRef.current?.querySelectorAll<HTMLInputElement>(
					'input[type="checkbox"]',
				) || [],
			);
			const currentIndex = checkboxes.indexOf(activeElement);
			if (currentIndex === -1) {
				return;
			}

			if (
				event.key === 'ArrowDown' ||
				(event.key === 'Tab' && !event.shiftKey)
			) {
				if (currentIndex < checkboxes.length - 1) {
					event.preventDefault();
					checkboxes[currentIndex + 1].focus();
				} else if (event.key === 'ArrowDown') {
					event.preventDefault();
					checkboxes[0].focus();
				}
			} else if (
				event.key === 'ArrowUp' ||
				(event.key === 'Tab' && event.shiftKey)
			) {
				if (currentIndex > 0) {
					event.preventDefault();
					checkboxes[currentIndex - 1].focus();
				} else {
					if (event.key === 'Tab' && event.shiftKey) {
						event.preventDefault();
						inputRef.current?.focus();
					} else if (event.key === 'ArrowUp') {
						event.preventDefault();
						checkboxes[checkboxes.length - 1].focus();
					}
				}
			} else if (event.key === 'Enter') {
				event.preventDefault();
				activeElement.click();
			}
		},
		[],
	);

	return (
		<ConfigItem
			title="Currencies"
			filter={
				<Input
					controlRef={inputRef}
					value={searchValue}
					onChange={handleSearch}
					onKeyDown={handleInputKeyDown}
					placeholder="Search currency or country"
				/>
			}
			onClear={handleClear}
		>
			<div ref={containerRef} onKeyDown={handleListKeyDown}>
				{countries
					.filter(
						searchValue === ''
							? filterByCode(selected)
							: filterByCodeAndName(searchValue),
					)
					.map(({ code, name, currencyCode }) => (
						<div key={code} className="Config__Currency_Item">
							<Checkbox
								className="Config__Currency_Input"
								checked={selected.includes(currencyCode)}
								controlProps={{ tabIndex: 0 }}
								onUpdate={(checked: boolean) =>
									handleChange(currencyCode, checked)
								}
							>
								<Flag currencyCode={currencyCode} /> {name}
							</Checkbox>
						</div>
					))}
			</div>
		</ConfigItem>
	);
}
