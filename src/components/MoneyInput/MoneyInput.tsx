import React from 'react';

import './MoneyInput.css';

interface IMoneyInputProps {
    currency: string;
    ratio: number;
    value: number;

    onChange(value: number): void;

    tabIndex?: number;
}

function format(value: number | string): string {
    const cardValue = `${value}`.replace(/\D/g, '');

    let i = cardValue.length - 1;
    const groups = [];

    while (i >= 0) {
        groups.push(`${cardValue[i - 2] || ''}${cardValue[i - 1] || ''}${cardValue[i] || ''}`);
        i = i - 3;
    }

    groups.reverse();

    return groups.join(' ');
}

export function MoneyInput({ currency, ratio, value, onChange, tabIndex }: IMoneyInputProps) {
    const [ full, decimal ] = value.toFixed(2).split('.');
    const inputCard = React.useRef<HTMLInputElement>(null);

    const handleChange = () => {
        if (!inputCard.current) {
            return;
        }

        onChange(parseInt(inputCard.current.value.replace(/\D/g, ''), 10));
    };

    return (
        <div className="MoneyInput">
            <input
                className="MoneyInput_Input"
                name={`${currency}-${ratio}`}
                data-currency={currency}
                data-ratio={ratio}
                type="text"
                value={format(full)}
                step={1}
                tabIndex={tabIndex}
                ref={inputCard}
                onChange={handleChange}
                aria-label={`Currency ${currency} with ${ratio} ratio`}
            />
            <span className="MoneyInput_Decimal">.{decimal}</span>
        </div>
    );
}
