import React from 'react';

import './Ratio.css';

import { DEFAULT_RATIOS } from '../../../config';

function sort(list) {
    return list.sort((a, b) => a - b);
}

export function Ratio({ selected = [], onChange }) {
    const handleUnchecked = React.useCallback((event) => {
        const { dataset } = event.target;
        const ratio = parseInt(dataset.ratio, 10);

        onChange(selected.filter((item) => item !== ratio));
    });

    const handleClear = React.useCallback((event) => {
        event.preventDefault();
        onChange(DEFAULT_RATIOS);
    });

    const [searchValue, setSearchValue] = React.useState('');

    const handleSearch = React.useCallback((event) => {
        const { value } = event.target;
        setSearchValue(value);
    });

    const handleSearchApply = React.useCallback((event) => {
        event.preventDefault();

        const value = parseInt(searchValue, 10);

        if (selected.includes(value)) {
            return;
        }

        onChange(sort([
            ...selected,
            parseInt(searchValue, 10),
        ]));
        setSearchValue('');
    });

    return (
        <div className="Config__Ratio">
            <p><b>Ratio:</b></p>
            <p>
                <input type="search" value={searchValue} onChange={handleSearch} />
                <button onClick={handleSearchApply}>Add</button>
            </p>
            <div>
                {selected
                    .map((ratio) => (
                        <label key={ratio} className="Config__Ratio_Item">
                            <input
                                className="Config__Ratio_Input"
                                type="checkbox"
                                data-ratio={ratio}
                                checked
                                onChange={handleUnchecked}
                            />
                            {ratio}
                        </label>
                    ))}
            </div>
            <p><a href="#" onClick={handleClear}>Clear to defaults</a></p>
        </div>
    );
}
