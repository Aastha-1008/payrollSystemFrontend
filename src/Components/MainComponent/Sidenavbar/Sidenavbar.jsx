import React from 'react';
import './Sidenavbar.scss';
import { Link } from 'react-router-dom';

export default function Sidenavbar() {
  return (
    <div className='sideNavbar-container'>
      <ul>
        <li><Link to="">Dashboard</Link></li>
        <li style={{marginTop:'5rem'}}><Link to="Employee">Employee</Link></li>
        <li style={{marginTop:'10rem'}}><Link to="Department">Department</Link></li>
      </ul>
    </div>
  )
}
