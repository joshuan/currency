import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import React from 'react';

import './style.css';
import { QueryClientProvider, queryClient } from './lib/query';

ReactDOM.render((
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
), document.getElementById('root'));
