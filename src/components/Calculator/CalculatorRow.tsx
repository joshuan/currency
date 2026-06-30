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
		summands,
		activeSummandIndex,
		sumCurrency,
		sumRatio,
	} = useSelector(useCalculator);

	// Calculate the sum in base values (USD)
	let baseValueSum = 0;
	for (const summand of summands) {
		const rate = rates[summand.currency];
		if (rate) {
			baseValueSum += summand.value / summand.ratio / rate;
		}
	}
	if (activeSummandIndex === null && value > 0) {
		const rate = rates[currency];
		if (rate) {
			baseValueSum += value / ratio / rate;
		}
	}

	const sumValue = baseValueSum * (rates[sumCurrency] || 1) * sumRatio;

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
									{summand.currency}-{summand.ratio}
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

				{/* Active/Temporary Summand */}
				{activeSummandIndex === null && (
					<>
						{summands.length > 0 && (
							<span className="CalculatorRow__Operator">+</span>
						)}
						<div
							className="CalculatorRow__Item CalculatorRow__Item_active CalculatorRow__Item_temp"
							onClick={handleSelectActive}
							role="button"
							tabIndex={0}
							title="Currently editing in the table"
						>
							<Flag className="CalculatorRow__Flag" currencyCode={currency} />
							<span className="CalculatorRow__Value">{formatMoney(value)}</span>
							<span className="CalculatorRow__Details">
								{currency}-{ratio}
							</span>
							<span className="CalculatorRow__Badge">editing</span>
						</div>
					</>
				)}

				{/* If we are NOT editing the active summand, we can still click to go back to editing a new summand */}
				{activeSummandIndex !== null && (
					<>
						{summands.length > 0 && (
							<span className="CalculatorRow__Operator">+</span>
						)}
						<div
							className="CalculatorRow__Item CalculatorRow__Item_temp"
							onClick={handleSelectActive}
							role="button"
							tabIndex={0}
							title="Click to resume editing a new summand"
						>
							<span className="CalculatorRow__Value">...</span>
						</div>
					</>
				)}

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

				{/* Currency Selector with Flag */}
				<div className="CalculatorRow__SelectorContainer">
					<Flag
						className="CalculatorRow__SelectorFlag"
						currencyCode={sumCurrency}
					/>
					<select
						className="CalculatorRow__Select"
						value={sumCurrency}
						onChange={handleSumCurrencyChange}
						title="Change sum currency"
					>
						{currencies.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>

				{/* Ratio Selector */}
				<div className="CalculatorRow__SelectorContainer">
					<select
						className="CalculatorRow__Select"
						value={sumRatio}
						onChange={handleSumRatioChange}
						title="Change sum ratio"
					>
						{ratios.map((r) => (
							<option key={r} value={r}>
								{r}
							</option>
						))}
					</select>
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
