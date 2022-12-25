import React from 'react'
import logo from './logo.svg';
import './App.css';

function App() {

  React.useEffect(()=>{
    fetch('/api/v1/items/').then(res=>{
      return res.json()
    }).then(data=>{
      console.log(data);
      setTestData(data.items)
    }).catch(err=>{console.log(err);})
  },[])
  
  const [testData, setTestData] = React.useState([]);
  const allDataFetched = testData.map(item=>{
    return <p>Name: {item.name}</p>
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!allDataFetched ? 'Loading data...': allDataFetched}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
