import React from 'react';

import './MoneyInput.css';

export type IMoneyInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface IMoneyInputProps {
    currency: string;
    ratio: number;
    value: number;
    onChange(event: IMoneyInputChangeEvent): void;
    tabIndex?: number;
}

export function MoneyInput({ currency, ratio, value, onChange, tabIndex }: IMoneyInputProps) {
    const [full, decimal] = value.toFixed(2).split('.');

    return (
        <div className="MoneyInput">
            <input
                className="MoneyInput_Input"
                name={`${currency}-${ratio}`}
                data-currency={currency}
                data-ratio={ratio}
                type="text"
                value={full}
                onChange={onChange}
                step={1}
                tabIndex={tabIndex}
            />
            <span className="MoneyInput_Decimal">.{decimal}</span>
        </div>
    );
}
