import React from 'react';

import './Config.css';

import { Currency } from './Currency/Currency';
import { Ratio } from './Ratio/Ratio';

export function Config({ currencies = [], ratios = [], onChangeCurrencies, onChangeRatios }) {
    return (
        <div className="Config">
            <div className="Config-Item">
                <Currency selected={currencies} onChange={onChangeCurrencies} />
            </div>
            <div className="Config-Item">
                <Ratio selected={ratios} onChange={onChangeRatios} />
            </div>
        </div>
    );
}
