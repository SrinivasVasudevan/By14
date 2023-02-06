import React from 'react'
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


    return (
        <div className='TransactionCard'>
            <div className='TransactionCard-thumbnail-container'>
                <div className='TransactionCard-thumbnail'>
                    {emojiMap[props.category.toLowerCase()]}
                </div>
            </div>
            <div className='TransactionCard-tags'>
                {props.category} {new Date(props.transactionDate).toDateString()}
            </div>
            <div className='TransactionCard-name'>
                {props.name}
            </div>
            <div className='TransactionCard-amount'>
                ₹{props.amount}
            </div>
        </div>
    )
}
