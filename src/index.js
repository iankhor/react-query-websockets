import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Server } from 'mock-socket';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const mockServer = new Server('ws://localhost:8080');

mockServer.on('connection', socket => {
  setInterval(() => {
    console.log('pretend new data event from server')
    socket.send('new-data-event')
  }, 3000);
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App queryClient={queryClient} />

    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
