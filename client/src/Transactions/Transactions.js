import { useCallback, useState, useEffect } from 'react'
import './Transactions.css';
import TransactionCard from './modules/TransactionCard/TransactionCard'
import NewTransaction from './modules/NewTransaction/NewTransaction'
import axios from 'axios'

function Transactions() {

  //transactions component state variable
  const [transactions, setTransactions] = useState([]);
  const [pageState, setPageState] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // const [currentPageSet, setCurrentPageSet] = useState(1);
  //const [refetchData, setRefetchData] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [metaData, setMetaData] = useState(1);
  const limit = 4;

  const fetchData = useCallback(()=>{
    fetch(`/api/v1/transaction?page=${currentPageNumber}&limit=${limit}`).then(result=>result.json()).then(data=>{
      if(data.transactions && data.transactions.length)
      {
        setTransactions(data.transactions)
        fetch(`/api/v1/transaction/metaData`).then(result=>result.json()).then(data=>{
          if(data.nHits)
          {
            setMetaData(data)
            setTotalPages(Math.ceil(data.nHits*1.0/limit))
          }
        })
      }

    })

  },[currentPageNumber])

  useEffect(()=>{
    fetchData()
  },[fetchData])


  function handleDelete(e, props)
  {
      e.preventDefault()
      e.stopPropagation()
      console.log(props._id)
      axios.delete(`/api/v1/transaction/${props._id}`).then(response=>{console.log(response);fetchData();}).catch(err=>console.log(err))

  }

  //react variables that uses states
  const transactionCard = transactions.map((transaction)=>{ return <TransactionCard {...transaction} setSelectedTransaction={setSelectedTransaction} setPageState={setPageState} handleDelete={handleDelete}/>});
  

  const paginatorButtons = [];
  
  
  
  function handlePageClick(index)
  {
    setCurrentPageNumber(index)
  }

  function updatePageSetone(mode)
  {
    if(!mode)
    {
      setCurrentPageNumber(prevData=>prevData-1)
    }
    else{
      setCurrentPageNumber(prevData=>prevData+1)
    }
  }

  function updatePageSet(mode)
  {
    if(!mode)
    {
      setCurrentPageNumber(prevData=>prevData-3)
    }
    else{
      setCurrentPageNumber(prevData=>prevData+3)
    }
  }

  for(let index = Math.ceil(currentPageNumber/3); index <= totalPages && index <= 3 + currentPageNumber; index++)
  {
    paginatorButtons.push(<li onClick={()=>{handlePageClick(index)}}>{index}</li>)
  }

  function addExpenseSwitch(){
    setPageState(prevState=>prevState?0:1);
  }

  

  return (
    <div className="Transactions">
      <div className='Transactions-options'>
        <div className='Transactions-options-totalspent'>
          <span className='Transactions-options-totalspent-label'>Total Amount Spent : </span><span className='Transactions-options-totalspent-amount'>₹{metaData.totalSpent}</span> 
        </div>
        <button className='Transactions-options-addExpense' onClick={addExpenseSwitch}>{pageState ? 'All Transactions':'Add Expense +'}</button>
      </div>
      <div className='TransactionCardContainer'>
        {pageState ? <NewTransaction {...selectedTransaction} pageState={pageState}/>:transactionCard}      
      </div>
      {
        pageState ? 
          <></>:
          <div className='Transactions-paginator'>
            <button className='Transactions-paginator-skipSection-prev' disabled={currentPageNumber===1 || currentPageNumber-3<totalPages} onClick={()=>{updatePageSet(0)}}>&lt;&lt;</button>
            <button className='Transactions-paginator-prev' disabled={currentPageNumber===1} onClick={()=>{updatePageSetone(0)}}>&lt;</button>
            <ul className='Transactions-paginator-pages'>
              {paginatorButtons}
            </ul>
            <button className='Transactions-paginator-next' disabled={currentPageNumber===totalPages} onClick={()=>{updatePageSetone(1)}}>&gt;</button>
            <button className='Transactions-paginator-skipSection-next' disabled={currentPageNumber===totalPages || currentPageNumber+3>totalPages} onClick={()=>{updatePageSet(1)}}>&gt;&gt;</button>
          </div>
      }
    </div>
  );
}

export default Transactions;
