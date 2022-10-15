import React from 'react';

import './Ratio.css';

import { DEFAULT_RATIOS } from '../../../config';
import { Button, IButtonClickEvent } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Checkbox } from '../../Checkbox/Checkbox';
import { ConfigItem } from '../Item/Item';

function sort(list: number[]) {
    return list.sort((a, b) => a - b);
}

interface IRatioProps {
    selected: number[];
    onChange(list: number[]): void;
}

export function Ratio({ selected = [], onChange }: IRatioProps) {
    const handleUnchecked = React.useCallback((ratio: number) => {
        onChange(selected.filter((item) => item !== ratio));
    }, [onChange, selected]);

    const handleClear = React.useCallback((event: IButtonClickEvent) => {
        event.preventDefault();
        onChange(DEFAULT_RATIOS);
    }, [onChange]);

    const [searchValue, setSearchValue] = React.useState('');

    const handleSearch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, [setSearchValue]);

    const handleSearchApply = React.useCallback((event: IButtonClickEvent) => {
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
    }, [setSearchValue, searchValue, selected, onChange]);

    return (
        <ConfigItem
            title="Ratio"
            filter={(
                <>
                    <Input
                        className="Config__Ratio_Input"
                        type="search"
                        value={searchValue}
                        onChange={handleSearch}
                        placeholder="Ration value"
                    />
                    <Button onClick={handleSearchApply}>Add</Button>
                </>
            )}
            onClear={handleClear}
        >
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
        </ConfigItem>
    );
}
