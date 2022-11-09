import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useToaster } from '@gravity-ui/uikit';

import { Button } from '../../Button/Button';
import { makeParams } from '../../../lib';
import { useCalculator, useConfig } from '../../../store';

export function HeaderLink() {
	const { currencies, ratios } = useSelector(useConfig);
	const values = useSelector(useCalculator);
	const toaster = useToaster();

	const handleLink = () => {
		const params = {
			currencies: currencies.join(','),
			ratios: ratios.join(','),
			value: `${values.currency}:${values.ratio}:${values.value}`,
		};
		const path = `/?${makeParams(params)}`;
		const url = `${window.location.protocol}//${window.location.host}${path}`;

		navigator.clipboard.writeText(url)
			.then(() => {
				toaster.add({
					name: 'copied',
					title: 'Copied',
					content: 'Copying completed successfully.',
					type: 'success',
				});
				window.history.replaceState(params, path, path);
			});
	};


	function save(event: KeyboardEvent) {
		if (event.code === 'KeyS' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			handleLink();
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', save);

		return () => {
			window.removeEventListener('keydown', save);
		};
	}, []);

	return (
		<Button className="Header__Link" view="normal" onClick={handleLink}>
			Link
		</Button>
	);
}
