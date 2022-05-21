import React from 'react';

import './MoneyInput.css';

export function MoneyInput({ currency, ratio, value, onChange }) {
    return (
        <input
            className="MoneyInput"
            name={`${currency}-${ratio}`}
            data-currency={currency}
            data-ratio={ratio}
            type="number"
            value={value.toFixed(0)}
            onChange={onChange}
            step={1}
        />
    );
}
