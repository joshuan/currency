import React from 'react';
import { Skeleton } from '@gravity-ui/uikit';

import { ICurrency, IRatio, ICalculations, ICalculate } from '../../types';
import { Flag } from '../Flag/Flag';
import { MoneyInput } from '../MoneyInput/MoneyInput';

import './Table.css';

interface ITableProps {
	loading: boolean;
	currencies: ICurrency[];
	ratios: IRatio[];
	values: ICalculations;

	onChange(_data: ICalculate): void;
	onRemoveCurrency(_currency: ICurrency): void;
}

function calcTabIndex(
	ratio: number,
	currency: number,
	currencies: Array<unknown>,
) {
	const ratioK = (ratio + 1) * currencies.length;

	return ratioK + currency;
}

export function Table({
	loading,
	currencies,
	ratios,
	values,
	onChange,
	onRemoveCurrency,
}: ITableProps) {
	if (currencies.length !== Object.keys(values).length) {
		throw new Error('Not consistence values', {
			cause: { currencies, values },
		});
	}

	return (
		<table className="Table">
			<thead>
				<tr>
					<th />
					{ratios.map((ratio) => (
						<th key={`ratio-${ratio}`}>{ratio}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{currencies.map((currency, indexCurrency) => (
					<tr key={currency}>
						<th className="Table__Currency">
							<button
								className="Table__Currency_Remove"
								onClick={() => onRemoveCurrency(currency)}
								title={`Remove ${currency}`}
								aria-label={`Remove ${currency}`}
							>
								&times;
							</button>
							<Flag className="Table__Currency_Flag" currencyCode={currency} />
							{currency}:
						</th>
						{ratios.map((ratio, indexRatio) => (
							<td key={`${currency}-${ratio}`}>
								{loading ? (
									<Skeleton className="Table__Skeleton" />
								) : (
									<MoneyInput
										currency={currency}
										ratio={ratio}
										value={values[currency] ? values[currency][ratio] : 0}
										onChange={(value: number) =>
											onChange({ currency, ratio, value })
										}
										tabIndex={calcTabIndex(
											indexRatio,
											indexCurrency,
											currencies,
										)}
									/>
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
