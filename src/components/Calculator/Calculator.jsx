import React from 'react';

import 'flag-icons/css/flag-icons.min.css';

import './Calculator.css';

const flagsMap = {
    USD: 'us',
    EUR: 'eu',
    RUB: 'ru',
    AED: 'ae',
    AUD: 'au',
    UAH: 'ua',
    GBP: 'gb',
};

export function Calculator({ rates, base }) {
    const list = [
        'USD',
        'EUR',
        'RUB',
        'AED',
        'AUD',
        'UAH',
        'GBP',
    ];

    const columns = [
        1,
        3,
        6,
        12,
    ];

    const [state, setState] = React.useState(list.reduce((acc, item) => {
        acc[item] = rates[item];
        return acc;
    }, {}));

    const handleChange = React.useCallback((event) => {
        const { dataset, value } = event.target;
        const name = dataset.currency;
        const koef = parseInt(dataset.koef, 10);
        const baseValue = (value / koef) / rates[name];

        setState(list.reduce((acc, item) => {
            acc[item] = baseValue * rates[item];
            return acc;
        }, {}));
    });

    return (
        <table className="Calculator">
            <thead>
                <tr>
                    <th />
                    <th />
                    {columns.map((koef) => (
                        <th key={`koef-${koef}`}>
                            {koef}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.entries(state).map(([currency, value]) => (
                    <tr key={currency}>
                        <th>
                            <span className={`fi fi-${flagsMap[currency]}`} />
                        </th>
                        <th>
                            {currency}:
                        </th>
                        {columns.map((koef) => (
                            <td key={`${currency}-${koef}`}>
                                <input
                                    name={`${currency}-${koef}`}
                                    data-currency={currency}
                                    data-koef={koef}
                                    type="number"
                                    value={(value * koef).toFixed(0)}
                                    onChange={handleChange}
                                    step={1}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
