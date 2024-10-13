import React,{useState} from 'react';
import './Employee.scss';

export default function Employee() {
    const [addEmployee, setAddEmployee] = useState(false);

    const EmployeeAddAction = () => {
        setAddEmployee(true);
    }

    const closeEmployeeAddAction = () => {
        setAddEmployee(false);
    }

    return (
        <div className='Employee-container'>
            <h1>Employee List</h1>
            <div className='searchSection'>
                <div className='EmployeeSearch'>
                    <p>Search</p>
                    <input type="text" placeholder='Search Here' id="searchInput" />
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
                        <td>
                            <button className='view'>View</button>
                            <button className='edit'>Edit</button>
                        </td>
                    </tr>
                </table>
            </div>

            {addEmployee && <div className='addEmployee'>
                <div className='closeBtn' onClick={closeEmployeeAddAction}>x</div>
                <div className='data'>
                    <div className='heading'>
                        <h1>First Name</h1>
                    </div>
                    <div className='InputData'>
                        <input type="text" id="firstName" placeholder='Enter first Name' />
                    </div>
                </div>
                <div className='data'>
                    <div className='heading'>
                        <h1>Last Name</h1>
                    </div>
                    <div className='InputData'>
                        <input type="text" id="firstName" placeholder='Enter Last Name' />
                    </div>
                </div>
                <div className='data'>
                    <div className='heading'>
                        <h1>Email</h1>
                    </div>
                    <div className='InputData'>
                        <input type="email" id="firstName" placeholder='Enter Last Name' />
                    </div>
                </div>
                <div className='data'>
                    <div className='heading'>
                        <h1>Gender</h1>
                    </div>
                    <div className='InputData'>
                        <input type="radio" id="male" name="gender" value="gender" />
                        <label for="Male">Male</label><br />
                        <input type="radio" id="female" name="gender" value="gender" />
                        <label for="female">Female</label><br />
                    </div>
                </div>
                <div className='data'>
                    <div className='heading'>
                        <h1>City</h1>
                    </div>
                    <div className='InputData'>
                        <input type="text" id="city" placeholder='Enter city' />
                    </div>
                </div>
                <div className='data'>
                    <div className='heading'>
                        <h1>State</h1>
                    </div>
                    <div className='InputData'>
                        <select name="state" id="state">
                            <option value='Andhara Pradesh'>Andhra Pradesh</option>
                            <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                            <option value='Assam'>Assam</option>
                            <option value='Bihar'>Bihar</option>
                            <option value='Chhatisgarh'>Chhatisgarh</option>
                            <option value='Goa'>Goa</option>
                            <option value='Gujarat'>Gujarat</option>
                            <option value='Haryana'>Haryana</option>
                            <option value='Himachal Pradesh'>Himachal Pradesh </option>
                            <option value='Jharkhand'>Jharkhand</option>
                            <option value='Karnataka'>Karnataka</option>
                            <option value='Kerala'>Kerala</option>
                            <option value='Madhya Pradesh'>Madhya Pradesh</option>
                            <option value='Maharashtra'>Maharashtra</option>
                            <option value='Manipur'>Manipur</option>
                            <option value='Meghalaya'>Meghalaya</option>
                            <option value='Mizoram'>Mizoram</option>
                            <option value='Nagaland'>Nagaland</option>
                            <option value='Odhisha'>Odisha</option>
                            <option value='Punjab'>Punjab</option>
                            <option value='Rajasthan'>Rajasthan</option>
                            <option value='Sikkim'>Sikkim</option>
                            <option value='Tamil Nadu'>Tamil Nadu</option>
                            <option value='Telangna'>Telangna</option>
                            <option value='Tripura'>Tripura</option>
                            <option value='Uttar Pradesh'>Uttar Pradesh</option>
                            <option value='Uttrakhand'>Uttrakhand</option>
                            <option value='West Bengal'>West Bengal</option>
                        </select>
                    </div>
                </div>
                <div className='data'>
                    <div className='heading'>
                        <h1>Country</h1>
                    </div>
                    <div className='InputData'>
                        <select name="country" id="country">
                            <option value="India">India</option>
                        </select>
                    </div>
                </div>
                <div className='data'>
                    <div className='heading'>
                        <h1>Department</h1>
                    </div>
                    <div className='InputData'>
                        <input type="text" id="department" placeholder='Enter department' />
                    </div>
                </div>

                <div className='data'>
                    <div className='heading'>
                        <h1>Job Title</h1>
                    </div>
                    <div className='InputData'>
                        <input type="text" id="job" placeholder='Enter Job title' />
                    </div>
                </div>

                <div className='data'>
                    <div className='heading'>
                        <h1>Salary</h1>
                    </div>
                    <div className='InputData'>
                        <input type="text" id="salary" placeholder='Enter Salary' />
                    </div>
                </div>

                <button className='button'>Add</button>
            </div>}
        </div>
    )
}
