import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [placeHolder, setplaceHolder] = useState('Hi');

  useEffect(() => {
    fetch('/hello').then(res => res.json()).then(data => {
      setplaceHolder(data.result);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Flask is here: { placeHolder }</p>
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
