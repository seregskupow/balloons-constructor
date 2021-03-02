import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const containers = [...document.querySelectorAll('#root')];
containers.forEach((item, index) => {
  ReactDOM.render(<App dropdown={`dropdown${index}`} />, item);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
