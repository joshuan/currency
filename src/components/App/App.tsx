import React from 'react';

import { useGetData } from '../../queries';
import { Calculator } from '../Calculator/Calculator';
import { DEFAULT_CURRENCIES, DEFAULT_RATIOS } from '../../config';
import { getFromStorage } from '../../lib/storage';
import { Spin, Text } from '@gravity-ui/uikit';
import { Center } from '../Center/Center';

import './App.css';

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.toString() : 'Unknown error';
}

export function App() {
    const query = useGetData();

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
                        <pre>{getErrorMessage(query.error)}</pre>
                    </Center>
                )
            }
        </div>
    );
}
