import React from 'react';

import './Currency.css';

import { countries } from '../../../lib/country';
import { Flag } from '../../Flag/Flag.jsx';
import { DEFAULT_CURRENCIES } from '../../../config';

function filterByCode(selected) {
    const lowerSelected = selected.map((item) => item.toLowerCase());

    return ({ currencyCode }) => lowerSelected.includes(currencyCode.toLowerCase());
}

function filterByCodeAndName(searchValue) {
    const lowerSearchValue = searchValue.toLowerCase();

    return ({ name, currencyCode }) =>
        name.toLowerCase().includes(lowerSearchValue) ||
        currencyCode.toLowerCase().includes(lowerSearchValue);
}

export function Currency({ selected = [], onChange }) {
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

    const handleClear = React.useCallback((event) => {
        onChange(DEFAULT_CURRENCIES);
        event.preventDefault();
    });

    const [searchValue, setSearchValue] = React.useState('');

    const handleSearch = React.useCallback((event) => {
        const { value } = event.target;
        setSearchValue(value);
    });

    return (
        <div className="Config__Currency">
            <p><b>Currencies:</b></p>
            <p><input type="search" value={searchValue} onChange={handleSearch} /></p>
            <div>
                {countries
                    .filter(
                        searchValue === '' ?
                            filterByCode(selected) :
                            filterByCodeAndName(searchValue)
                    )
                    .map(({ code, name, currencyCode }) => (
                        <label key={code} className="Config__Currency_Item">
                            <input
                                className="Config__Currency_Input"
                                type="checkbox"
                                data-currency={currencyCode}
                                checked={selected.includes(currencyCode)}
                                onChange={handleChange}
                            />
                            <Flag currencyCode={currencyCode} /> {name}
                        </label>
                    ))}
            </div>
            <p><a href="#" onClick={handleClear}>Clear to defaults</a></p>
        </div>
    );
}
