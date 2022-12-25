import React, { useCallback } from 'react'
import Item from './Item/Item'
import './App.css';

function parseName(name){
  return name.split(' ').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ')
}

function createNewItem(){
  console.log('athalaam innum panala');
}

function App() {

  const [testData, setTestData] = React.useState([]);

  const deleteCurrentItem = useCallback((id)=>
    {
      console.log(`${id}`)
      fetch(`/api/v1/items/${id}`, { method: 'DELETE' }).then(res=>{
        return res.json()
      }).then(data=>{
        console.log(data);
      })
    }, []
  );

  React.useEffect(()=>{
    fetch('/api/v1/items/').then(res=>{
      return res.json()
    }).then(data=>{
      console.log(data);
      setTestData(data.items);
    }).catch(err=>{console.log(err);})
  },[deleteCurrentItem])


  const allDataFetched = testData.map(item=>{
    return ( 
        <Item deleteItem={deleteCurrentItem} parseName={parseName} {...item}/>
    )
  })

  return (
    <div className="App">
      <div className = "ItemList">
          {!allDataFetched ? 'Loading data...': allDataFetched}
      </div>
      <button className='Item--new' onClick={createNewItem}>
        Create New Item
      </button>
    </div>
  );
}

export default App;
