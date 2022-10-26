import { useToaster } from '@gravity-ui/uikit';
import React from 'react';
import { useSelector } from 'react-redux';
import { useCalculator, useConfig } from '../../../store';

import { Button } from '../../Button/Button';

export function HeaderLink() {
	const { currencies, ratios } = useSelector(useConfig);
	const select = useSelector(useCalculator);
	const toaster = useToaster();

	const handleLink = () => {
		const url = `${window.location.protocol}//${window.location.host}/` +
			`?currencies=${currencies.join(',')}` +
			`&ratios=${ratios.join(',')}` +
			`&select=${select.currency}:${select.ratio}:${select.value}`;

		navigator.clipboard.writeText(url)
			.then(() => {
				toaster.add({
					name: 'copied',
					title: 'Copied',
					content: 'Copying completed successfully.',
					type: 'success',
				});
			});
	};

	return (
		<Button className="Header__Link" view="normal" onClick={handleLink}>
			Link
		</Button>
	);
}
