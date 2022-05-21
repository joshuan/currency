import React from 'react';

import { Header } from '../Header/Header';
import { Page } from '../Page/Page';
import { Table } from '../Table/Table';
import { Config } from '../Config/Config';

import './Calculator.css';

function calculateValues(rates, selected, update) {
    const baseValue = (update.value / update.ratio) / rates[update.currency];
    const result = {};

    for (const currency of selected.currencies) {
        result[currency] = {};

        for (const ratio of selected.ratios) {
            result[currency][ratio] = baseValue * rates[currency] * ratio;
        }
    }

    return result;
}

export function Calculator(props) {
    const [currencies, setCurrencies] = React.useState(props.currencies);
    const [ratios, setRatios] = React.useState(props.ratios);
    const [lastCurrency, setLastCurrency] = React.useState(props.currencies[0]);
    const [lastRatio, setLastRatio] = React.useState(props.ratios[0]);
    const [lastValue, setLastValue] = React.useState(1);
    const [values, setValues] = React.useState(calculateValues(
        props.data.rates,
        { currencies, ratios },
        { currency: lastCurrency, ratio: lastRatio, value: 1 },
    ));

    const handleChangeCurrency = React.useCallback((list) => {
        setCurrencies(list);
        setValues(calculateValues(
            props.data.rates,
            { currencies: list, ratios },
            { currency: lastCurrency, ratio: lastRatio, value: lastValue },
        ));
    });

    const handleChangeValue = React.useCallback(({ currency, ratio, value }) => {
        setLastCurrency(currency);
        setLastRatio(ratio);
        setLastValue(value);

        setValues(calculateValues(
            props.data.rates,
            { currencies, ratios },
            { currency, ratio, value },
        ));
    });

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
                <hr />
                <Config selected={currencies} onChange={handleChangeCurrency} />
            </Page>
        </div>
    );
}
