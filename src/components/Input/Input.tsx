import React from 'react';
import { TextInput, TextInputProps } from '@gravity-ui/uikit';

type IInputProps = Partial<Pick<TextInputProps, 'view' | 'size'>> & Omit<TextInputProps, 'view' | 'size'>;

export type IInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const Input = (props: IInputProps) => (
	<TextInput view="normal" size="m" {...props} />
);
