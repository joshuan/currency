import React from 'react';
import { ICurrency, IRatio, ICalculate, ICalculations, DTO } from '../../types';

import { Header } from '../Header/Header';
import { Hr } from '../Hr/Hr';
import { Page } from '../Page/Page';
import { Table } from '../Table/Table';
import { Config } from '../Config/Config';
import { calculateValues } from './utils';
import { saveToStorage } from '../../lib/storage';

import './Calculator.css';

interface ICalculatorProps {
    data: DTO;
    currencies: ICurrency[];
    ratios: IRatio[];
}

export function Calculator(props: ICalculatorProps) {
    const [currencies, setCurrencies] = React.useState(props.currencies);
    const [ratios, setRatios] = React.useState(props.ratios);
    const [lastCurrency, setLastCurrency] = React.useState(props.currencies[0]);
    const [lastRatio, setLastRatio] = React.useState(props.ratios[0]);
    const [lastValue, setLastValue] = React.useState(1);
    const [values, setValues] = React.useState<ICalculations>(calculateValues(
        props.data.rates,
        { currencies, ratios },
        { currency: lastCurrency, ratio: lastRatio, value: 1 },
    ));

    function updateCurrencies(selected: ICurrency[]) {
        setCurrencies(selected);
        saveToStorage('currencies', selected);
    }

    function updateRatios(selected: IRatio[]) {
        setRatios(selected);
        saveToStorage('ratios', selected);
    }

    const handleChangeCurrency = React.useCallback((list: ICurrency[]) => {
        updateCurrencies(list);
        setValues(calculateValues(
            props.data.rates,
            { currencies: list, ratios },
            { currency: lastCurrency, ratio: lastRatio, value: lastValue },
        ));
    }, [props.data.rates, ratios, lastCurrency, lastRatio, lastValue]);

    const handleChangeRatio = React.useCallback((list: IRatio[]) => {
        updateRatios(list);
        setValues(calculateValues(
            props.data.rates,
            { currencies, ratios: list },
            { currency: lastCurrency, ratio: lastRatio, value: lastValue },
        ));
    }, [props.data.rates, ratios, lastCurrency, lastRatio, lastValue]);

    const handleChangeValue = React.useCallback(({ currency, ratio, value }: ICalculate) => {
        if (Number.isNaN(value)) {
            value = 0;
        }

        setLastCurrency(currency);
        setLastRatio(ratio);
        setLastValue(value);

        setValues(calculateValues(
            props.data.rates,
            { currencies, ratios },
            { currency, ratio, value },
        ));
    }, [props.data.rates]);

    return (
        <div className="Calculator">
            <Header date={props.data.timestamp * 1000}/>
            <Page>
                <Table
                    currencies={currencies}
                    ratios={ratios}
                    values={values}
                    onChange={handleChangeValue}
                />
                <Hr />
                <Config
                    currencies={currencies}
                    ratios={ratios}
                    onChangeCurrencies={handleChangeCurrency}
                    onChangeRatios={handleChangeRatio}
                />
            </Page>
        </div>
    );
}
