import React,{useState} from 'react';
import './MainComponent.scss';

export default function MainComponent() {

  const [addEmployee , setAddEmployee] = useState(false);
  const EmployeeAddAction = () => {
    setAddEmployee(true);
  }

  const closeEmployeeAddAction = () =>{
    setAddEmployee(false);
  }

  return (
    <div className='main-container'>
      <h1>Employee List</h1>
      <div className='searchSection'>
        <div className='EmployeeSearch'>
          <p>Search</p>
          <input type="text" placeholder='Search Here' id="searchInput"/>
          <button className='button' >Search</button>
        </div>
        <div className='AddEmployee'>
          <button className='button' onClick={EmployeeAddAction}>Add Employee</button>
        </div>
      </div>
      <div className='Emp_data'>
        <table>
          <tr>
            <th>Sr. No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>City</th>
            <th>Department</th>
            <th>Job</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Aastha</td>
            <td>Chaudhary</td>
            <td>aastha@gmail.com</td>
            <td>Female</td>
            <td>Ghaziabad</td>
            <td>IT</td>
            <td>Backend Developer</td>
            <td><button className='edit'>Edit</button></td>
          </tr>
        </table>
      </div>

      {addEmployee && <div className='addEmployee'>
          <div className='data'>
            <div className='heading'>
              <h1>First Name</h1>
            </div>
            <div className='InputData'>
              <input type="text" id="firstName" placeholder='Enter first Name'/>
            </div>
          </div>
      </div>}
    </div>
  )
}
