import React from 'react';
import { Button as GravityButton, ButtonProps } from '@gravity-ui/uikit';

export type IButtonProps = ButtonProps;

export type IButtonClickEvent = React.MouseEvent<
	HTMLAnchorElement | HTMLButtonElement,
	MouseEvent
>;

export const Button = (props: IButtonProps) => (
	<GravityButton view="action" size="m" {...props} />
);
