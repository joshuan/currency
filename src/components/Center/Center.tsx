import React, { PropsWithChildren } from 'react';

import './Center.css';

export function Center({ children }: PropsWithChildren) {
	return <div className="Center">{children}</div>;
}
