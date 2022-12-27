import React, { useCallback } from 'react'
import Item from './Item/Item'
import './App.css';

function parseName(name){
  return name.split(' ').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ')
}





function App() {

  const [testData, setTestData] = React.useState([]);
  const [itemData, setItemData] = React.useState({'name':'','price':'','category':'','_id':''});
  const [pageState, setPageState] = React.useState('View'); // tracks create state very bad naming :(

  const fetchData = useCallback(()=>{
    fetch('/api/v1/items/').then(res=>{
      return res.json()
    }).then(data=>{
      console.log(data);
      setTestData(data.items);
    }).catch(err=>{console.log(err);})
  },[]);

  function createButtonClicked(){
    setPageState('Create')
  }

  const deleteCurrentItem = useCallback((id)=>
    {
      console.log(`${id}`)
      fetch(`/api/v1/items/${id}`, { method: 'DELETE' }).then(res=>{
        return res.json()
      }).then(data=>{
        console.log(data);
        fetchData();
      })
    }, [fetchData]
  );


  const createItem = useCallback((pageState)=>
  {
    console.log(pageState)
    if(pageState==='Create')
    {
      console.log(itemData)
      fetch('/api/v1/items/', {method: 'POST', headers: {
        'Content-Type': 'application/json'
      },body: JSON.stringify(itemData)}).then(result=>result.json).then(data=>{console.log(data); fetchData()})
    }
    else{
      console.log(itemData)
      fetch(`/api/v1/items/${itemData._id}`, {method: 'PATCH', headers: {
        'Content-Type': 'application/json'
      },body: JSON.stringify(itemData)}).then(result=>result.json).then(data=>{console.log(data); fetchData()})
    }
  }, [fetchData, itemData] 
  );

  function updateItemSetup(_id)
  {
    setPageState('Update');
    fetch(`/api/v1/items/${_id}`).then(res=>{
      return res.json()
    }).then(data=>{
      console.log(data);
      setItemData({'name':data.items.name,'price':data.items.price,'category':data.items.category, '_id':_id})
    }).catch(err=>{console.log(err);})
    
  }

  function formDataChange(event)
  {
    const {name, value} = event.target;
    console.log(value)
    setItemData(prevData => ({...prevData, [name]:value}))
    console.log(itemData)
  }

  React.useEffect(()=>{
    fetchData()
  },[fetchData, deleteCurrentItem])


  const allDataFetched = testData.map(item=>{
    return ( 
        <Item updateItemSetup={updateItemSetup} deleteItem={deleteCurrentItem} parseName={parseName} {...item}/>
    )
  })

  return (
    <div className="App">
      {pageState === 'View' && 
      <>
        <div className = "ItemList">
            {!allDataFetched ? 'Loading data...': allDataFetched}
        </div>
        <button className='Item--new' onClick={createButtonClicked}>
          Create New Item
        </button>
      </>
      }
      {(pageState === 'Create' || pageState === 'Update') && 
      <>
        <form onSubmit={()=>createItem(pageState)}>
            <label htmlFor='Name'>Name</label>
            <input type='text' name='name' id='Name' value={itemData.name} onChange={(event)=>formDataChange(event)}/>
            <label htmlFor='Price'>Price</label>
            <input type='text' name='price' id='Price' value={itemData.price} onChange={(event)=>formDataChange(event)}/>
            <label htmlFor='Category'>Category</label>
            <input type='text' name='category' id='Category' value={itemData.category} onChange={(event)=>formDataChange(event)}/>
            <button>{pageState === 'Create'?'Add':'Update'}</button>
        </form>
      </>}
      
    </div>
  );
}

export default App;
