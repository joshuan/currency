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
    const handleUnchecked = React.useCallback((ratio) => {
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
            <div className="Config__Ratio_Add">
                <Input className="Config__Ratio_Input" type="search" value={searchValue} onChange={handleSearch} />
                <Button onClick={handleSearchApply}>Add</Button>
            </div>
            <div>
                {selected
                    .map((ratio) => (
                        <Checkbox
                            key={ratio}
                            className="Config__Ratio_Checkbox"
                            checked
                            onChange={() => handleUnchecked(ratio)}
                        >
                            {ratio}
                        </Checkbox>
                    ))}
            </div>
            <p><Button view="normal" onClick={handleClear}>Clear to defaults</Button></p>
        </div>
    );
}
