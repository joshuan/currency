import React from 'react';

import './MoneyInput.css';

export function MoneyInput({ currency, ratio, value, onChange, tabIndex }) {
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
