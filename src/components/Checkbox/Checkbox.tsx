import React from 'react';
import { Checkbox as GravityCheckbox, CheckboxProps } from '@gravity-ui/uikit';

type ICheckboxProps = Partial<Pick<CheckboxProps, 'size'>> &
	Omit<CheckboxProps, 'size'>;

export const Checkbox = (props: ICheckboxProps) => (
	<GravityCheckbox size="m" {...props} />
);
