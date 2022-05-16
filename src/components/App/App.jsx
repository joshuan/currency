import React from 'react';

import { Header } from '../Header/Header';
import { Page } from '../Page/Page';

import './App.css';

// var data = window.data;
// var inputs = document.getElementsByTagName('input');
//
// function change(cur, value) {
//     var baseValue = value / data.rates[cur];
//     for (var input of inputs) {
//         if (input.name !== cur) {
//             input.value = (
//                 baseValue * data.rates[input.name]
//             ).toFixed(2);
//         }
//     }
// }
//
// for (var input of inputs) {
//     input.addEventListener('change', function(event) {
//         change(event.target.name, event.target.value);
//     });
// }

export function App() {
    return (
        <div className="App">
            <Header />
            <Page>
                <p>App</p>
            </Page>
        </div>
    );
}
