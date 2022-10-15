import React from 'react';

import { Flag } from '../Flag/Flag';
import { MoneyInput } from '../MoneyInput/MoneyInput';

import './Table.css';

export function Table({ currencies, ratios, values, onChange }) {
    // const [state, setState] = React.useState(currencies.reduce((acc, item) => {
    //     acc[item] = rates[item];
    //     return acc;
    // }, {}));

    const handleChange = React.useCallback((event) => {
        const { dataset, value } = event.target;

        onChange({
            currency: dataset.currency,
            ratio: parseInt(dataset.ratio, 10),
            value: value,
        });
    });

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
