import React,{useState} from 'react';
import './Dashboard.scss';
import { Link } from 'react-router-dom';
import Employee from '../../../Image/employee.png';
import Attendance from '../../../Image/attendance.png';
import Absence from '../../../Image/absence.png';
import 'react-calendar/dist/Calendar.css';
import Calendar from '../Calendar/Calender';


export default function Dashboard() {

  return (
    <div className='dashboard-container'>
      <h1>Overviews</h1>
      <div className='dashboard-data'>
        <div className='dashboard-container'>
          <div className='box blue'>
            <div className='content'>
              <div className='Count'>
                <p>Total Employees</p>
                <h1>4</h1>
              </div>
              <div className='Image'>
                <img src={Employee}/>
              </div>
            </div>
            <div className='MoreInfoBtn'>
            <Link to="/Employee"> More Info &#8594;</Link>
          </div>
          </div>
          <div className='box yellow'>
            <div className='content'>
              <div className='Count'>
                <p>Attendance %</p>
                <h1>89 %</h1>
              </div>
              <div className='Image attendance'>
                <img src={Attendance} />
              </div>
            </div>
            <div className='MoreInfoBtn'>
            <Link to="/Employee"> More Info &#8594;</Link>
          </div>
          </div>
          <div className='box red'>
            <div className='content'>
              <div className='Count'>
                <p>Absence</p>
                <h1>4</h1>
              </div>
              <div className='Image attendance'>
                <img src={Absence} />
              </div>
            </div>
            <div className='MoreInfoBtn'>
            <Link to="/Employee"> More Info &#8594;</Link>
          </div>
          </div>
        </div>
        <div className='calender'>
          <Calendar/>
        </div>
      </div>
    </div>
  )
}
