import React from 'react';

import { currencyMap } from '../../lib';

import './Flag.css';

interface IFlagProps {
	currencyCode: string;
	className?: string;
}

export function Flag({ currencyCode, className }: IFlagProps) {
	return (
		<span
			className={`Flag Flag-${currencyMap[currencyCode]} ${className || ''}`}
		/>
	);
}
