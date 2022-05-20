import React from 'react';

import './Header.css';

export function Header({ date }) {
    return (
        <div className="Header">
            {date !== null && (
                <div className="Header__Date">{(new Date(date)).toLocaleString()}</div>
            )}
            <div className="Header__Title">Currency calculator</div>
        </div>
    );
}
