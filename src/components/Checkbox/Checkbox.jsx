import React from 'react';
import { Checkbox as GravityCheckbox } from '@gravity-ui/uikit';

export const Checkbox = (props) => {
    return (
        <GravityCheckbox view="action" size="m" {...props} />
    );
}
