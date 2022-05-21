import React from 'react';
import { useQuery } from 'react-query';

import { Calculator } from '../Calculator/Calculator';
import { DEFAULT_CURRENCIES, DEFAULT_RATIOS } from '../../config';

import './App.css';

function getData() {
    return new Promise((resolve) => {
        fetch(`/data.json?time=${Date.now()}`)
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
}

export function App() {
    const query = useQuery('data', getData);

    return (
        <div className="App">
            {
                query.status === 'loading' && (
                    <p>Loading...</p>
                )
            }
            {
                query.status === 'success' && (
                    <Calculator
                        data={query.data}
                        currencies={DEFAULT_CURRENCIES}
                        ratios={DEFAULT_RATIOS}
                    />
                )
            }
        </div>
    );
}
