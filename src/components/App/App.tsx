import React from 'react';
import { useQuery } from 'react-query';
import { DTO } from '../../types';

import { Calculator } from '../Calculator/Calculator';
import { DEFAULT_CURRENCIES, DEFAULT_RATIOS } from '../../config';

import './App.css';
import { getFromStorage } from '../../lib/storage';
import { Spin, Text } from '@gravity-ui/uikit';
import { Center } from '../Center/Center';

function getData(): Promise<DTO> {
    return new Promise((resolve, reject) => {
        fetch(`/data.json?time=${Date.now()}`)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
}

export function App() {
    const query = useQuery<DTO>('data', getData);

    return (
        <div className="App">
            {
                query.status === 'loading' && (
                    <Center>
                        <Spin size="xl" />
                    </Center>
                )
            }
            {
                query.status === 'success' && (
                    <Calculator
                        data={query.data}
                        currencies={getFromStorage('currencies', DEFAULT_CURRENCIES)}
                        ratios={getFromStorage('ratios', DEFAULT_RATIOS)}
                    />
                )
            }
            {
                query.status === 'error' && (
                    <Center>
                        <p><Text variant="display-1">Error</Text></p>
                        <pre>{query.error?.toString()}</pre>
                    </Center>
                )
            }
        </div>
    );
}