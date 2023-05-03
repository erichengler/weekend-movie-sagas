import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.js';
import { Provider } from 'react-redux';
import storeInstance from './redux/store.js';
// Styling
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
