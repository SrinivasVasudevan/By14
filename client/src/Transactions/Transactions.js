import { useCallback, useState, useEffect } from 'react'
import './Transactions.css';
import TransactionCard from './modules/TransactionCard'

function Transactions() {

  //transactions component state variable
  const [transactions, setTransactions] = useState([]);

  const fetchData = useCallback(()=>{
    fetch('/api/v1/transaction/').then(result=>result.json()).then(data=>{
      if(data.transactions && data.transactions.length)
      {
        setTransactions(data.transactions)
      }
    })
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])


  //react variables that uses states
  const transactionCard = transactions.map((transaction)=>{ return <TransactionCard {...transaction}/>}) 

  return (
    <div className="Transactions">
      <div className='TransactionCardContainer'>
        {transactionCard}      
      </div>
    </div>
  );
}

export default Transactions;
