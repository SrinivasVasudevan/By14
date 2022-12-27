import React from 'react'

export default function Item(props){
    const {updateItemSetup, deleteItem, parseName, _id, name, price, category} = props;
    console.log(parseName(name), price, category, _id)
    return (
        <div className='each--item' onClick={()=>updateItemSetup(_id)}>      
            <span className='each--item--category'><span className='each--item--category--label'>{category}</span></span>
            <span className='each--item--name'><span className='each--item--name--label'>{parseName(name)}</span></span>
            <span className='each--item--price'><span className='each--item--price--label'>{price}</span></span>
            <button className='each--item--delete' onClick={(event)=>{event.preventDefault(); deleteItem(_id)}} >Delete</button>
        </div>
    )
}