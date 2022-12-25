import React from 'react'

export default function Item(props){
    const {deleteItem, parseName, _id, name, price, category} = props;
    console.log(parseName(name), price, category, _id)
    return (
        <div className='each--item'>
            <ul>
                <button className='each--item--delete' onClick={()=>deleteItem(_id)} >Delete</button>
                <li>{parseName(name)}</li>
                <li><span className=''><span className='each--item--price--label'>Price: </span>{price}</span></li>
                <li><span className=''><span className='each--item--category--label'>Category: </span>{category}</span></li>
            </ul>
        </div>
    )
}