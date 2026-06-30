import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useConfig, useCalculator, calculatorActions } from '../../store';
import { Flag } from '../Flag/Flag';
import { Button } from '../Button/Button';
import { IRates } from '../../types';

import './CalculatorRow.css';

interface ICalculatorRowProps {
	rates: IRates;
}

function formatMoney(val: number) {
	const parts = val.toFixed(2).split('.');
	const full = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return `${full}.${parts[1]}`;
}

export function CalculatorRow({ rates }: ICalculatorRowProps) {
	const dispatch = useDispatch();
	const { currencies, ratios } = useSelector(useConfig);
	const {
		currency,
		ratio,
		value,
		tempSummand,
		summands,
		activeSummandIndex,
		sumCurrency,
	} = useSelector(useCalculator);

	// Calculate the sum in base values (USD)
	let baseValueSum = 0;
	summands.forEach((summand, index) => {
		const rate = rates[summand.currency];
		if (rate) {
			if (activeSummandIndex === index) {
				baseValueSum += value / ratio / rate;
			} else {
				baseValueSum += summand.value / summand.ratio / rate;
			}
		}
	});

	const tempRate = rates[tempSummand.currency];
	if (tempRate) {
		if (activeSummandIndex === null) {
			baseValueSum += value / ratio / tempRate;
		} else {
			baseValueSum += tempSummand.value / tempSummand.ratio / tempRate;
		}
	}

	const sumValue = baseValueSum * (rates[sumCurrency] || 1) * ratio;

	const handleAdd = () => {
		dispatch(calculatorActions.addSummand());
	};

	const handleRemove = (e: React.MouseEvent, index: number) => {
		e.stopPropagation();
		dispatch(calculatorActions.removeSummand(index));
	};

	const handleSelectSummand = (index: number) => {
		dispatch(calculatorActions.selectSummand(index));
	};

	const handleSelectActive = () => {
		dispatch(calculatorActions.selectActiveSummand());
	};

	const handleSelectSum = () => {
		dispatch(calculatorActions.selectSum({ rates }));
	};

	const handleSumCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(
			calculatorActions.setSumCurrency({ currency: e.target.value, rates }),
		);
	};

	const handleSumRatioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(
			calculatorActions.setSumRatio({
				ratio: parseFloat(e.target.value),
				rates,
			}),
		);
	};

	const handleClear = () => {
		dispatch(calculatorActions.clearCalculator());
	};

	const isPlusDisabled = activeSummandIndex !== null || value === 0;

	return (
		<div className="CalculatorRow">
			<div className="CalculatorRow__Title">Calculator:</div>

			{/* Global Calculator/Sum target Settings */}
			<div className="CalculatorRow__Settings">
				<div className="CalculatorRow__SelectorContainer">
					<Flag
						className="CalculatorRow__SelectorFlag"
						currencyCode={sumCurrency}
					/>
					<select
						className="CalculatorRow__Select"
						value={sumCurrency}
						onChange={handleSumCurrencyChange}
						title="Change target currency"
					>
						{currencies.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>

				<div className="CalculatorRow__SelectorContainer">
					<select
						className="CalculatorRow__Select"
						value={ratio}
						onChange={handleSumRatioChange}
						title="Change target ratio"
					>
						{ratios.map((r) => (
							<option key={r} value={r}>
								{r}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="CalculatorRow__Expression">
				{summands.map((summand, index) => {
					const isActive = activeSummandIndex === index;
					return (
						<React.Fragment key={index}>
							{index > 0 && <span className="CalculatorRow__Operator">+</span>}
							<div
								className={`CalculatorRow__Item ${isActive ? 'CalculatorRow__Item_active' : ''}`}
								onClick={() => handleSelectSummand(index)}
								role="button"
								tabIndex={0}
								title="Click to edit this summand in the table"
							>
								<Flag
									className="CalculatorRow__Flag"
									currencyCode={summand.currency}
								/>
								<span className="CalculatorRow__Value">
									{formatMoney(summand.value)}
								</span>
								<span className="CalculatorRow__Details">
									{summand.currency}
								</span>
								<button
									className="CalculatorRow__Item_Remove"
									onClick={(e) => handleRemove(e, index)}
									title="Remove summand"
									aria-label="Remove summand"
								>
									&times;
								</button>
							</div>
						</React.Fragment>
					);
				})}

				{/* Active/Temporary Summand (always visible, never collapsed) */}
				{summands.length > 0 && (
					<span className="CalculatorRow__Operator">+</span>
				)}
				<div
					className={`CalculatorRow__Item CalculatorRow__Item_temp ${
						activeSummandIndex === null ? 'CalculatorRow__Item_active' : ''
					}`}
					onClick={handleSelectActive}
					role="button"
					tabIndex={0}
					title="Click to edit new summand"
				>
					<Flag
						className="CalculatorRow__Flag"
						currencyCode={tempSummand.currency}
					/>
					<span className="CalculatorRow__Value">
						{formatMoney(tempSummand.value)}
					</span>
					<span className="CalculatorRow__Details">{tempSummand.currency}</span>
				</div>

				{/* Plus button to fix the active summand */}
				<Button
					className="CalculatorRow__AddBtn"
					view="action"
					size="s"
					disabled={isPlusDisabled}
					onClick={handleAdd}
					title={
						value === 0
							? 'Enter a value in the table first'
							: 'Fix this summand'
					}
				>
					+
				</Button>

				<span className="CalculatorRow__Operator">=</span>

				{/* Sum result */}
				<div
					className={`CalculatorRow__Item CalculatorRow__Item_sum ${
						activeSummandIndex === 'sum' ? 'CalculatorRow__Item_active' : ''
					}`}
					onClick={handleSelectSum}
					role="button"
					tabIndex={0}
					title="Click to view the sum in the table"
				>
					<span className="CalculatorRow__Value">{formatMoney(sumValue)}</span>
				</div>
			</div>

			<Button
				className="CalculatorRow__ClearBtn"
				view="flat"
				size="s"
				onClick={handleClear}
				disabled={
					summands.length === 0 && activeSummandIndex === null && value === 0
				}
			>
				Clear
			</Button>
		</div>
	);
}
