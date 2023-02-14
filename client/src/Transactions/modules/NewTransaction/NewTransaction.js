import React from 'react'
import './NewTransaction.css'

export default function NewTransaction(){
    // console.log(props);

    return (
        <div className='NewTransaction'>

            <form className='NewTransaction-form'>
                <label htmlFor='NewTransaction-name'>Transaction Name</label>
                <input type='text' name='name' id='NewTransaction-name' placeholder='Transaction Name'></input>
                <label htmlFor='NewTransaction-amount'>Amount</label>
                <input type='number' name='amount' id='NewTransaction-amount' placeholder='Amount'></input>
                <label htmlFor='NewTransaction-transactionDate'>Transaction Date</label>
                <input type='datetime-local' name='transactionDate' id='NewTransaction-transactionDate'></input>
                <label htmlFor='NewTransaction-category'>Category</label>
                <input type='text' name='category' id='NewTransaction-category' hidden></input>
            </form>

        </div>
    )
}
