import React from 'react';

import './Calculator.css';

export function Calculator({ rates, base }) {
// var inputs = document.getElementsByTagName('input');
//
// function change(cur, value) {
//     var baseValue = value / data.rates[cur];
//     for (var input of inputs) {
//         if (input.name !== cur) {
//             input.value = (
//                 baseValue * data.rates[input.name]
//             ).toFixed(2);
//         }
//     }
// }
//
// for (var input of inputs) {
//     input.addEventListener('change', function(event) {
//         change(event.target.name, event.target.value);
//     });
// }

    const list = [
        'USD',
        'EUR',
        'RUB',
        'AED',
        'AUD',
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
                        <th>{currency}:</th>
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
