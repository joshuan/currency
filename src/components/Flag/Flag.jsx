import React from 'react';

import 'flag-icons/css/flag-icons.min.css';

import './Flag.css';

import { currencyMap } from '../../lib/country';

export function Flag({ currencyCode, className }) {
    return (
        <span className={`fi fi-${currencyMap[currencyCode]} ${className}`} />
    );
}
