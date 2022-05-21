import React from 'react';

import './Config.css';

import { countries } from '../../lib/country';
import { Flag } from '../Flag/Flag';

export function Config({ selected = [], onChange }) {
    const handleChange = React.useCallback((event) => {
        const { dataset, checked } = event.target;
        const name = dataset.currency;

        if (checked) {
            onChange([
                ...selected,
                name,
            ]);
        } else {
            onChange(selected.filter((item) => item !== name));
        }
    });

    return (
        <div>
            <h3>Config:</h3>
            <p><b>Currencies:</b></p>
            <ul>
                {countries.map(({ code, name, currencyCode }) => (
                    <li key={code}>
                        <input
                            type="checkbox"
                            data-currency={currencyCode}
                            checked={selected.includes(currencyCode)}
                            onChange={handleChange}
                        />
                        <Flag currencyCode={currencyCode} /> {name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
