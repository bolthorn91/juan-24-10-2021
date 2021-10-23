import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/variables.scss'
import './styles/mixins.scss'
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from 'context/AppContext';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: 'AIzaSyB-XBu795Mu-LYpLRJbR0KrhBXabnU7XCg',
    authDomain: 'juan-test-1f3ad.firebaseapp.com',
    projectId: 'juan-test-1f3ad',
    storageBucket: 'juan-test-1f3ad.appspot.com',
    messagingSenderId: '991218275271',
    appId: '1:991218275271:web:a5716876b761e3f54fbfe2'
};
initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
