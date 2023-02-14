import { useCallback, useState, useEffect } from 'react'
import './Transactions.css';
import TransactionCard from './modules/TransactionCard/TransactionCard'
import NewTransaction from './modules/NewTransaction/NewTransaction'

function Transactions() {

  //transactions component state variable
  const [transactions, setTransactions] = useState([]);
  const [pageState, setPageState] = useState(0);

  const fetchData = useCallback(()=>{
    fetch(`/api/v1/transaction?page=${1}&limit=${10}`).then(result=>result.json()).then(data=>{
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
  const transactionCard = transactions.map((transaction)=>{ return <TransactionCard {...transaction}/>});
  let totalTransactionAmount = 0;
  transactions.forEach((transaction)=>{totalTransactionAmount += transaction.amount;})

  function addExpenseSwitch(){
    setPageState(prevState=>!prevState);
  }

  return (
    <div className="Transactions">
      <div className='Transactions-options'>
        <div className='Transactions-options-totalspent'>
          <span className='Transactions-options-totalspent-label'>Total Amount Spent : </span><span className='Transactions-options-totalspent-amount'>₹{totalTransactionAmount}</span> 
        </div>
        <button className='Transactions-options-addExpense' onClick={addExpenseSwitch}>{pageState ? 'All Transactions':'Add Expense +'}</button>
      </div>
      <div className='TransactionCardContainer'>
        {pageState ? <NewTransaction />:transactionCard}      
      </div>
      <div className='Transactions-paginator'>
        <button>&lt;&lt;</button>
        <button>&lt;</button>
        <ul className='Transactions-paginator-pages'>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
        <button>&gt;</button>
        <button>&gt;&gt;</button>
      </div>
    </div>
  );
}

export default Transactions;
