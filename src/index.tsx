import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);


export const socket = new WebSocket('ws://localhost:3000/ws');
root.render(
	
		<App />

);
