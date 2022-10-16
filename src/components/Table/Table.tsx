import React from 'react';
import { ICurrency, IRatio, ICalculations, ICalculate } from '../../types';
import { Flag } from '../Flag/Flag';
import { MoneyInput } from '../MoneyInput/MoneyInput';

import './Table.css';

interface ITableProps {
    currencies: ICurrency[];
    ratios: IRatio[];
    values: ICalculations;
    onChange(data: ICalculate): void;
}

export function Table({ currencies, ratios, values, onChange }: ITableProps) {
    if (currencies.length !== Object.keys(values).length) {
        throw new Error('Not consistence values', { cause: { currencies, values } });
    }

    return (
        <table className="Table">
            <thead>
                <tr>
                    <th />
                    {ratios.map((ratio) => (
                        <th key={`ratio-${ratio}`}>
                            {ratio}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {currencies.map((currency, indexCurrency) => (
                    <tr key={currency}>
                        <th className="Table__Currency">
                            <Flag className="Table__Currency_Flag" currencyCode={currency} />
                            {currency}:
                        </th>
                        {ratios.map((ratio, indexRatio) => (
                            <td key={`${currency}-${ratio}`}>
                                <MoneyInput
                                    currency={currency}
                                    ratio={ratio}
                                    value={values[currency] ? values[currency][ratio] : 0}
                                    onChange={(value: number) => onChange({ currency, ratio, value })}
                                    tabIndex={(indexRatio + 1) * currencies.length + indexCurrency}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
