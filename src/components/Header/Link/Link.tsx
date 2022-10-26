import React from 'react';
import { useSelector } from 'react-redux';
import { useCalculator, useConfig } from '../../../store';

import { Button } from '../../Button/Button';

export function HeaderLink() {
	const { currencies, ratios } = useSelector(useConfig);
	const select = useSelector(useCalculator);

	const handleLink = () => {
		const url = `${window.location.protocol}//${window.location.host}/` +
			`?currencies=${currencies.join(',')}` +
			`&ratios=${ratios.join(',')}` +
			`&select=${select.currency}:${select.ratio}:${select.value}`;

		navigator.clipboard.writeText(url).then(() => {
			// eslint-disable-next-line no-console
			console.log('Copied');
		});
	};

	return (
		<Button className="Header__Link" view="normal" onClick={handleLink}>
			Link
		</Button>
	);
}
