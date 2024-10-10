import React from 'react';
import './MainComponent.scss';

export default function MainComponent() {
  return (
    <div className='main-container'>
      <h1>Employee List</h1>
      <div className='searchSection'>
        <p>Search</p>
        <input type="text" placeholder='Search Here' id="searchInput"/>
      </div>
    </div>
  )
}
