import React from 'react';

import './Header.css';
import { Text } from '@gravity-ui/uikit';

interface IHeaderProps {
	date: number | null;
}

export function Header({ date }: IHeaderProps) {
	return (
		<div className="Header">
			{date !== null && (
				<div className="Header__Date">
					<Text variant="code-2">
						{new Date(date).toLocaleString()}
					</Text>
				</div>
			)}
			<h1 className="Header__H1">
				<Text variant="display-2">Currency calculator</Text>
			</h1>
		</div>
	);
}
