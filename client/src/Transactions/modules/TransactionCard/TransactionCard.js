import React from 'react'
import './TransactionCard.css'

//food shopping travel bills entertainment others
export default function TransactionCard(props){
    console.log(props);

    let emojiMap = {
        'food': '🍔',
        'shopping': '🛒',
        'travel': '✈️',
        'bills': '📝',
        'entertainment': '🎥',
        'miscellaneous': '💰'
    }

    function parseCategory(category){
        return category === 'Miscellaneous' ? 'Misc' : category
    }

    function handleTransactionCardClick(transaction)
    {
        console.log('clicked card.. ', transaction);
        props.setSelectedTransaction(transaction);
        props.setPageState(2);
    }

    

    return (
        <div className='TransactionCard' onClick={()=>{handleTransactionCardClick(props)}}>
            <div className='TransactionCard-thumbnail-container'>
                <div className='TransactionCard-thumbnail'>
                    <span className='TransactionCard-thumbnail-emoji'>{emojiMap[props.category.toLowerCase()]}</span>
                </div>
            </div>
            <div className='TransactionCard-tags'>
                <span className='TransactionCard-tags-category'>{parseCategory(props.category)}</span><span className='TransactionCard-tags-datetime'>🗓️ {new Date(props.transactionDate).toDateString().split(' ').slice(1).join(' ')}</span>    
            </div>
            <div className='TransactionCard-name'>
                <span className='TransactionCard-name-label'>{props.name}</span>
                
            </div>
            <div className='TransactionCard-amount'>
                <span className='TransactionCard-amount-delete' onClick={(e)=>{props.handleDelete(e, props)}}>🗑️</span>
                <span className='TransactionCard-amount-label'>₹{props.amount}</span>
            </div>
        </div>
    )
}
