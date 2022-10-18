import React from 'react';

import { useGetData } from '../../queries';
import { Calculator } from '../Calculator/Calculator';
import { DEFAULT_CURRENCIES, DEFAULT_RATIOS } from '../../config';
import { getFromStorage } from '../../lib/storage';
import { Spin, Text } from '@gravity-ui/uikit';
import { Center } from '../Center/Center';

import './App.css';
import { Header } from '../Header/Header';

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.toString() : 'Unknown error';
}

export function App() {
    const query = useGetData();

    return (
        <div className="App">
            <Header date={query.status === 'success' ? (query.data.timestamp * 1000) : null}/>
            {
                (query.isLoading || query.isSuccess) ? (
                    <Calculator
                        loading={query.isLoading}
                        rates={query.isSuccess ? query.data.rates : {}}
                        currencies={getFromStorage('currencies', DEFAULT_CURRENCIES)}
                        ratios={getFromStorage('ratios', DEFAULT_RATIOS)}
                    />
                ) : null
            }
            {
                query.isError ? (
                    <Center>
                        <p><Text variant="display-1">Error</Text></p>
                        <pre>{getErrorMessage(query.error)}</pre>
                    </Center>
                ) : null
            }
        </div>
    );
}
