import React from 'react';
import { Button as GravityButton } from '@gravity-ui/uikit';

export const Button = (props) => {
    return (
        <GravityButton view="action" size="m" {...props} />
    );
}
