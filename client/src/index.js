import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Transactions from './Transactions/Transactions';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='App'>
      <Transactions />
    </div>
  </React.StrictMode>
);
