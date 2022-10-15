import React from 'react';

import './Header.css';
import { Text } from '@gravity-ui/uikit';

export function Header({ date }) {
    return (
        <div className="Header">
            {date !== null && (
                <div className="Header__Date">
                    <Text variant="code-2">{(new Date(date)).toLocaleString()}</Text>
                </div>
            )}
            <div>
                <Text variant="display-2">Currency calculator</Text>
            </div>
        </div>
    );
}
