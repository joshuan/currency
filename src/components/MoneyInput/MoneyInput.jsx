import React from 'react';

import './MoneyInput.css';

export function MoneyInput({ currency, ratio, value, onChange }) {
    const [full, decimal] = value.toFixed(2).split('.');

    return (
        <div className="MoneyInput">
            <input
                className="MoneyInput_Input"
                name={`${currency}-${ratio}`}
                data-currency={currency}
                data-ratio={ratio}
                type="number"
                value={full}
                onChange={onChange}
                step={1}
            />
            <span className="MoneyInput_Decimal">.{decimal}</span>
        </div>
    );
}
