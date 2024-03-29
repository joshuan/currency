import React from 'react';
import { Text } from '@gravity-ui/uikit';

import { HeaderLink } from './Link/Link';

import './Header.css';

interface IHeaderProps {
	date: number | null;
}

export function Header({ date }: IHeaderProps) {
	return (
		<div className="Header">
			<h1 className="Header__H1">
				<Text variant="display-2">Currency calculator</Text>
			</h1>
			{date !== null && (
				<div className="Header__Right">
					<HeaderLink />
					<Text className="Header__Date" variant="code-2">{new Date(date).toLocaleString()}</Text>
				</div>
			)}
		</div>
	);
}
