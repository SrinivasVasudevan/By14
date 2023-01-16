import { useCallback, useState, useEffect } from 'react'
import './Transactions.css';

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
  const transactionCard = transactions.map((transaction)=>{
    return <p>{transaction.name} {transaction.amount} {new Date(transaction.transactionDate).toDateString()} {transaction.category}</p>
  }) 

  return (
    <div className="Transactions">
      {transactionCard}
    </div>
  );
}

export default Transactions;
