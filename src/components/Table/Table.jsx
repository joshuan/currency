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
                    <th />
                    {ratios.map((ratio) => (
                        <th key={`ratio-${ratio}`}>
                            {ratio}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {currencies.map((currency) => (
                    <tr key={currency}>
                        <th><Flag currencyCode={currency} /></th>
                        <th>{currency}:</th>
                        {ratios.map((ratio) => (
                            <td key={`${currency}-${ratio}`}>
                                <MoneyInput
                                    currency={currency}
                                    ratio={ratio}
                                    value={values[currency][ratio]}
                                    onChange={handleChange}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
