import React from 'react';

import 'flag-icons/css/flag-icons.min.css';

import './Flag.css';

import { currencyMap } from '../../lib/country';

interface IFlagProps {
    currencyCode: string;
    className?: string;
}

export function Flag({ currencyCode, className }: IFlagProps) {
    return (
        <span className={`fi fi-${currencyMap[currencyCode]} ${className || ''}`} />
    );
}
