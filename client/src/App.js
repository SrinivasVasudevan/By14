import React, { useCallback } from 'react'
import './App.css';
import ItemsList from './ItemsList/ItemsList.js';
import Suggestions from './Suggestions/Suggestions';
import UserDetails from './UserDetails/UserDetails';
import Charts from './Charts/Charts';

function App() {

    const [testData, setTestData] = React.useState([]);

    const fetchData = useCallback(()=>{
        fetch('/api/v1/items/').then(res=>{
        return res.json()
        }).then(data=>{
        console.log(data);
        setTestData(data.items);
        console.log(data.totalPrice)
        }).catch(err=>{console.log(err);})
    },[]);

    React.useEffect(()=>{
        fetchData()
    },[fetchData])
    
    return (
        <>
            <div className='Charts' > <Charts testData={testData}/> </div>
            <div className='UserDetails'> <UserDetails /> </div>  
            <div className='Suggestions'> <Suggestions /></div>
            <div className='ItemsList'> <ItemsList fetchData={fetchData} testData={testData}/> </div>
        </>   
    )
}

export default App;


