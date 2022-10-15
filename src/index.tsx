import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { configure } from '@gravity-ui/uikit';
import React from 'react';

import '@gravity-ui/uikit/styles/styles.css';
import './style.css';
import { QueryClientProvider, queryClient } from './lib/query';

configure({
    lang: 'en',
})

ReactDOM.render((
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
), document.getElementById('root'));
