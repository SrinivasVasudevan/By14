import React from 'react'
import './NewTransaction.css'
import axios from 'axios'

export default function NewTransaction(props){
    // console.log(props);
    //categories hard coded for now

    console.log(props)

    

    const [formData, setFormData] = React.useState({...props, 'transactionDate':props.transactionDate.slice(0,-1)});

    // React.useEffect(()=>{
    //     if(props.pageState === 2)
    //     {
    //         console.log('update state')
    //         formData
    //     }
    // },[])

    

    function handleTransactionSubmit(event)
    {
        console.log('submit attempted ....')
        if(props.pageState === 1)
            axios.post('/api/v1//transaction/', formData).then(response=>console.log(response)).catch(err=>console.log(err))
        else
            axios.patch(`/api/v1//transaction/${formData._id}`, formData).then(response=>console.log(response)).catch(err=>console.log(err))
    }

    function handleChange(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(prevData => ({...prevData, [name]:value}))
    }

    function switchActiveCategory(event, category){
        
        // let classArray = event.currentTarget.className.split(' ')
        // if(classArray.length === 1)
        // {
        //     classArray.push('active')
        // }
        // else{
        //     classArray = [classArray[0]]
        // }

        // let newClassName = classArray.join(' ')
        // event.currentTarget.className = newClassName
        console.log(category)
        setFormData(prevData => ({...prevData, 'category':category}))
        console.log(formData)
    }

    let emojiMap = {
        'food': '🍔',
        'shopping': '🛒',
        'travel': '✈️',
        'bills': '📝',
        'entertainment': '🎥',
        'miscellaneous': '💰'
    }


   let categories = ['food',
   'shopping',
   'travel',
   'bills',
   'entertainment',
   'miscellaneous'];

   let categoriesContainers = categories.map(category=>{
    return (<div className={`NewTransaction-category-container ${category === formData.category ? 'active': ''}`} id='NewTransaction-choice-category' onClick={(e)=>{switchActiveCategory(e, category)}} > <span className='NewTransaction-category-container-thumbnail'>{emojiMap[category]}</span> {category} </div>)
   })

    return (
        <div className='NewTransaction'>

            <form className='NewTransaction-form' onSubmit={handleTransactionSubmit}>
                    <span className='NewTransaction-form-container NewTransaction-amount-container'>
                        {/* <label htmlFor='NewTransaction-amount'>💵</label> */}
                        <input type='number' name='amount' id='NewTransaction-amount' placeholder='0' onChange={handleChange} value={formData.amount || ''}></input>
                    </span>
                    

                    <span className='NewTransaction-form-container NewTransaction-name-container'>
                        {/* <label htmlFor='NewTransaction-name'>🗒️</label> */}
                        <input type='textarea' name='name' id='NewTransaction-name' placeholder='🗒️ Transaction Reason' onChange={handleChange} value={formData.name || ''}></input>
                    </span>
                    
                    {/* <span className='NewTransaction-form-container NewTransaction-category-container'>
                        <label htmlFor='NewTransaction-category'>Category</label>
                        <input type='text' name='category' id='NewTransaction-category' hidden></input>
                    </span> */}

                    <div className='NewTransaction-form-categories'>
                        <label htmlFor='NewTransaction-choice-category'>Category</label>
                        <div className='NewTransaction-form-categories-container'>
                        {categoriesContainers}
                        </div>
                        <input type='text' name='category' id='NewTransaction-transactionDate' hidden value={formData.category || 'Miscellaneous'} onChange={handleChange}></input>
                    </div>
                                    
                    <span className='NewTransaction-form-container NewTransaction-transactionDate-container'>
                        <label htmlFor='NewTransaction-transactionDate'>📅 Transaction Date </label>
                        <input type='datetime-local' name='transactionDate' id='NewTransaction-transactionDate' onChange={handleChange} value={formData.transactionDate || ''}></input>   
                        {/* <DateTimePicker onChange={onChange} value={value} amPmAriaLabel='Select AM/PM' maxDetail='second' format='dd-MM-y h:mm:ss a'/> */}
                    </span>

                    <button type='submit' className='NewTransaction-submit'>Save Transaction</button>
            </form>

        </div>
    )
}
