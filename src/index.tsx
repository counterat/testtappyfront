import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const AdController = (window as any).Adsgram.init({ blockId: "1648" });

export {AdController}
export const socket = new WebSocket('ws://localhost:8000/ws');
root.render(
	
		<App />

);
