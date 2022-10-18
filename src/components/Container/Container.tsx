import React from 'react';

import './Container.css';

type IContainerProps = React.PropsWithChildren;

export function Container({ children }: IContainerProps) {
    return (
        <div className="Container">
            {children}
        </div>
    );
}
