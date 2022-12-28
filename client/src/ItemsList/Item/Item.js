import React from 'react'
import {FaTrash} from 'react-icons/fa';

export default function Item(props){
    const {updateItemSetup, deleteItem, parseName, _id, name, price, category} = props;
    console.log(parseName(name), price, category, _id)
    return (
        <div className='each-item' onClick={()=>updateItemSetup(_id)}>      
            <div className='each-item-card'>
                <span className='each-item-category'><span className='each-item-category-label'>{parseName(category)[0]}</span></span>
                <span className='each-item-name'><span className='each-item-name-label'>{parseName(name)}</span></span>
                <span className='each-item-price'><span className='each-item-price-label'>{price}</span></span>
                <span className='each-item-delete'><FaTrash className='each-item-delete-icon' onClick={(event)=>{event.stopPropagation(); deleteItem(_id)}}/></span>
                
            </div>
        </div>
    )
}