import React from 'react';
import './MainComponent.scss';
import Employee from './Employee/Employee';
import Sidenavbar from './Sidenavbar/Sidenavbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Department from './Department/Department';
import Dashboard from './Dashboard/Dashboard';



export default function MainComponent() {



  return (
    <div className='main-container'>
      <Router>
        <Sidenavbar/>
        <Routes>
          <Route exact path = "/" element = {<Dashboard/>}/>
          <Route exact path = "/Employee" element = {<Employee/>}/>
          <Route exact path = "/Department" element = {<Department/>}/>
        </Routes>      
      </Router>
    </div>
  )
}
