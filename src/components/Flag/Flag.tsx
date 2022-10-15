import React from 'react';

import './Flag.css';

import { currencyMap } from '../../lib/country';

interface IFlagProps {
    currencyCode: string;
    className?: string;
}

export function Flag({ currencyCode, className }: IFlagProps) {
    return (
        <span className={`Flag Flag-${currencyMap[currencyCode]} ${className || ''}`} />
    );
}
