import React from 'react';
import ReactDOM from 'react-dom/client';
import Charts from './Charts/Charts';
import './index.css';
import ItemsList from './ItemsList/ItemsList.js';
import Suggestions from './Suggestions/Suggestions';
import UserDetails from './UserDetails/UserDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <div className='Charts'> <Charts/> </div>
        <div className='UserDetails'> <UserDetails /> </div>  
        <div className='Suggestions'> <Suggestions /></div>
        <div className='ItemsList'> <ItemsList /> </div>
    </>
   
);


