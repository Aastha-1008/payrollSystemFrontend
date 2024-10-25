import './App.css';
import MainComponent from  './Components/MainComponent/MainComponent.jsx';
import { useState } from 'react';

function App() {

  const [freeze , setFreeze] = useState(false);
  
  return (
    <div className="App">
      <div className='top-container'>
        <h1>Payroll Management System</h1>
      </div>
      <div className='middle-container'>
        <MainComponent/>
      </div>
      <div className='bottom-container'>
        <p>Copyright 2024 DSA TechSimplified. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
