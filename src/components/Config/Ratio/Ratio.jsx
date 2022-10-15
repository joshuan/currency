import React from 'react';

import './Ratio.css';

import { DEFAULT_RATIOS } from '../../../config';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Checkbox } from '../../Checkbox/Checkbox';

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
                <Input type="search" value={searchValue} onChange={handleSearch} />
                <Button onClick={handleSearchApply}>Add</Button>
            </p>
            <div>
                {selected
                    .map((ratio) => (
                        <label key={ratio} className="Config__Ratio_Item">
                            <Checkbox
                                className="Config__Ratio_Input"
                                data-ratio={ratio}
                                checked
                                onChange={handleUnchecked}
                            />
                            {ratio}
                        </label>
                    ))}
            </div>
            <p><Button view="normal" onClick={handleClear}>Clear to defaults</Button></p>
        </div>
    );
}
