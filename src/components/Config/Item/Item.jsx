import React from 'react';

import './Item.css';

import { Button } from '../../Button/Button';
import { Text } from '@gravity-ui/uikit';

export function ConfigItem({ title, filter, children, onClear }) {
    return (
        <div className="Config__Item">
            <Text variant="header-1" className="Config__Item_Head">{title}:</Text>
            <div className="Config__Item_Filter">
                {filter}
            </div>
            <div className="Config__Item_Content">
                {children}
            </div>
            <p><Button view="normal" onClick={onClear}>Clear to defaults</Button></p>
        </div>
    );
}
