import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./firebase"

import './styles/index.scss';
import './styles/task-header.scss';
import './styles/task-container.scss';
import './styles/task-field.scss';
import './styles/task-item.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

