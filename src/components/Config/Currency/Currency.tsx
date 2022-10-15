import React from 'react';

import './Currency.css';

import { countries } from '../../../lib/country';
import { IButtonClickEvent } from '../../Button/Button';
import { Flag } from '../../Flag/Flag';
import { DEFAULT_CURRENCIES } from '../../../config';
import { Input } from '../../Input/Input';
import { Checkbox } from '../../Checkbox/Checkbox';
import { ConfigItem } from '../Item/Item';

function filterByCode(selected: string[]) {
    const lowerSelected = selected.map((item) => item.toLowerCase());

    return ({ currencyCode }: { currencyCode: string; }) => lowerSelected.includes(currencyCode.toLowerCase());
}

function filterByCodeAndName(searchValue: string) {
    const lowerSearchValue = searchValue.toLowerCase();

    return ({ name, currencyCode }: { name: string; currencyCode: string; }) =>
        name.toLowerCase().includes(lowerSearchValue) ||
        currencyCode.toLowerCase().includes(lowerSearchValue);
}

interface ICurrencyProps {
    selected: string[];
    onChange(list: string[]): void;
}

export function Currency({ selected = [], onChange }: ICurrencyProps) {
    const handleChange = React.useCallback((name: string, checked: boolean) => {
        if (checked) {
            onChange([
                ...selected,
                name,
            ]);
        } else {
            onChange(selected.filter((item) => item !== name));
        }
    }, [onChange, selected]);

    const handleClear = React.useCallback((event: IButtonClickEvent) => {
        onChange(DEFAULT_CURRENCIES);
        event.preventDefault();
    }, [onChange]);

    const [searchValue, setSearchValue] = React.useState('');

    const handleSearch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, [setSearchValue]);

    return (
        <ConfigItem
            title="Currencies"
            filter={(
                <Input
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder="Search currency or country"
                />
            )}
            onClear={handleClear}
        >
            {countries
                .filter(
                    searchValue === '' ?
                        filterByCode(selected) :
                        filterByCodeAndName(searchValue)
                )
                .map(({ code, name, currencyCode }) => (
                    <label key={code} className="Config__Currency_Item">
                        <Checkbox
                            className="Config__Currency_Input"
                            checked={selected.includes(currencyCode)}
                            onUpdate={(checked: boolean) => handleChange(currencyCode, checked)}
                        >
                            <Flag currencyCode={currencyCode} /> {name}
                        </Checkbox>
                    </label>
                ))}
        </ConfigItem>
    );
}
