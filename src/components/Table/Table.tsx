import React from 'react';
import { ICurrency, IRatio, ICalculations, ICalculate } from '../../types';
import { Flag } from '../Flag/Flag';
import { IMoneyInputChangeEvent, MoneyInput } from '../MoneyInput/MoneyInput';

import './Table.css';

interface ITableProps {
    currencies: ICurrency[];
    ratios: IRatio[];
    values: ICalculations;
    onChange(data: ICalculate): void;
}

export function Table({ currencies, ratios, values, onChange }: ITableProps) {
    const handleChange = React.useCallback((event: IMoneyInputChangeEvent) => {
        const { dataset, value } = event.target;

        onChange({
            currency: dataset.currenc as string,
            ratio: parseInt(dataset.ratio as string, 10),
            value: parseFloat(value),
        });
    }, [onChange]);

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
                                    value={values[currency][ratio]}
                                    onChange={handleChange}
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
