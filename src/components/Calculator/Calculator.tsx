import React, { useEffect } from 'react';
import { ICurrency, IRatio, ICalculate, ICalculations, IRates } from '../../types';

import { Hr } from '../Hr/Hr';
import { Container } from '../Container/Container';
import { Table } from '../Table/Table';
import { Config } from '../Config/Config';
import { calculateValues } from './utils';
import { saveToStorage } from '../../lib/storage';

import './Calculator.css';

interface ICalculatorProps {
    loading: boolean;
    rates: IRates;
    currencies: ICurrency[];
    ratios: IRatio[];
}

export function Calculator(props: ICalculatorProps) {
    const [ currencies, setCurrencies ] = React.useState(props.currencies);
    const [ ratios, setRatios ] = React.useState(props.ratios);
    const [ lastCurrency, setLastCurrency ] = React.useState(props.currencies[0]);
    const [ lastRatio, setLastRatio ] = React.useState(props.ratios[0]);
    const [ lastValue, setLastValue ] = React.useState(1);
    const [ values, setValues ] = React.useState<ICalculations>(calculateValues(
        props.rates,
        { currencies, ratios },
        { currency: lastCurrency, ratio: lastRatio, value: 1 },
    ));

    useEffect(() => setValues(calculateValues(
        props.rates,
        { currencies, ratios },
        { currency: lastCurrency, ratio: lastRatio, value: 1 },
    )), [ props.rates ]);

    function updateCurrencies(selected: ICurrency[]) {
        setCurrencies(selected);
        saveToStorage('currencies', selected);
    }

    function updateRatios(selected: IRatio[]) {
        setRatios(selected);
        saveToStorage('ratios', selected);
    }

    const handleChangeCurrency = (list: ICurrency[]) => {
        updateCurrencies(list);
        setValues(calculateValues(
            props.rates,
            { currencies: list, ratios },
            { currency: lastCurrency, ratio: lastRatio, value: lastValue },
        ));
    };

    const handleChangeRatio = (list: IRatio[]) => {
        updateRatios(list);
        setValues(calculateValues(
            props.rates,
            { currencies, ratios: list },
            { currency: lastCurrency, ratio: lastRatio, value: lastValue },
        ));
    };

    const handleChangeValue = ({ currency, ratio, value }: ICalculate) => {
        setLastCurrency(currency);
        setLastRatio(ratio);
        setLastValue(value);

        setValues(calculateValues(
            props.rates,
            { currencies, ratios },
            { currency, ratio, value },
        ));
    };

    return (
        <div className="Calculator">
            <Container>
                <Table
                    loading={props.loading}
                    currencies={currencies}
                    ratios={ratios}
                    values={values}
                    onChange={handleChangeValue}
                />
            </Container>
            <Hr/>
            <Container>
                <Config
                    currencies={currencies}
                    ratios={ratios}
                    onChangeCurrencies={handleChangeCurrency}
                    onChangeRatios={handleChangeRatio}
                />
            </Container>
        </div>
    );
}
