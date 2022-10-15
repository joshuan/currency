import React from 'react';
import { Button as GravityButton, ButtonProps } from '@gravity-ui/uikit';

type IButtonProps = Partial<Pick<ButtonProps, 'size' | 'view'>> & Omit<ButtonProps, 'size' | 'view'>;

export type IButtonClickEvent = React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>;

export const Button = (props: IButtonProps) => {
    return (
        <GravityButton view="action" size="m" {...props} />
    );
}
