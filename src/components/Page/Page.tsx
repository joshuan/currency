import React from 'react';

import './Page.css';

type IPageProps = React.PropsWithChildren;

export function Page({ children }: IPageProps) {
    return (
        <div className="Page">
            {children}
        </div>
    );
}
