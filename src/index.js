// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component
import './index.css'; // Import any global styles

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root') // Ensure there is a div with id="root" in your index.html
);