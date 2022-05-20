import React from 'react';
import { useQuery } from 'react-query';

import { Header } from '../Header/Header';
import { Page } from '../Page/Page';

import './App.css';
import { Calculator } from '../Calculator/Calculator';

function getData() {
    return new Promise((resolve) => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
}

export function App() {
    const query = useQuery('data', getData);

    return (
        <div className="App">
            <Header />
            <Page>
                {
                    query.status === 'loading' && (
                        <p>Loading...</p>
                    )
                }
                {
                    query.status === 'success' && (
                        <Calculator
                            rates={query.data.rates}
                            base={query.data.base}
                        />
                    )
                }
            </Page>
        </div>
    );
}
