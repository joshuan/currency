import React, { PropsWithChildren } from 'react';

import './Item.css';

import { Button, IButtonClickEvent } from '../../Button/Button';
import { Text } from '@gravity-ui/uikit';

type IConfigItemProps = PropsWithChildren<{
	title: string;
	filter: React.ReactNode;
	onClear(event: IButtonClickEvent): void;
}>

export function ConfigItem({ title, filter, children, onClear }: IConfigItemProps) {
	return (
		<div className="Config__Item">
			<Text variant="header-1" className="Config__Item_Head">{title}:</Text>
			<div className="Config__Item_Filter">
				{filter}
			</div>
			<div className="Config__Item_Content">
				{children}
			</div>
			<p><Button view="normal" onClick={onClear}>Clear to defaults</Button></p>
		</div>
	);
}
