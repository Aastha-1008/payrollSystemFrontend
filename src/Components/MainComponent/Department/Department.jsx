import React, { useEffect, useState } from 'react';
import './Department.scss';
import { getDepartments } from '../../departmentService';
import { getJobByDepartmentId,addJobToDepartment } from '../../jobService';

const Department = () => {

    const [addDepartment, setAddDepartment] = useState(false);
    const [addJobSection , setAddJobSection] = useState(null);
    const [departmentId , setDepartmentId] = useState(null);
    const [departmentName, setDepartmentName] = useState(null);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [jobTags, setJobTags] = useState([]);
    const [input, setInput] = useState('');
    const [department, setDepartment] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [jobName , setJobName] = useState(null);

    useEffect(() => {
        fetchDepartment();
    }, []);

    const fetchDepartment = async () => {
        try {
            const department = await getDepartments();
            setDepartment(department);
            console.log(department );
        } catch (error) {
            console.log("Error fetching department data", error);
        }
    }

    const fetchJobs = async (departmentId , departmentName) => {
        setDepartmentId(departmentId);
        setDepartmentName(departmentName);
        setJobs(null);
        try {
            const jobInDepartment = await getJobByDepartmentId(departmentId);
            setJobs(jobInDepartment);
        } catch (error) {
            console.log("Error fetching jobs", error);
        }
    }

    const onChangeJobName = (e) => {
        const { value } = e.target;
        setJobName(value);
        console.log(jobName);
    }

    const addJobToDepartment = async () => {
        // addJobToDepartment(departmentId ,jobName );
        setJobName(true);
        console.log("clicked on job add btn");
    }


    const addDepartmentFunction = () => {
        setAddDepartment(true);
    }

    const closeAddDepartmentFunction = () => {
        setAddDepartment(false);
    }

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    }

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
        if ((key === ',' || key === 'Enter') && trimmedInput.length && !jobTags.includes(trimmedInput)) {
            e.preventDefault();
            setJobTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }
        if (key === 'Backspace' && !input.length && jobTags.length) {
            e.preventDefault();
            const jobTagsCopy = [...jobTags];
            const poppedTag = jobTagsCopy.pop();
            e.preventDefault();
            setJobTags(jobTagsCopy);
            setInput(poppedTag);
        }
    }

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        setJobTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    return (
        <div className='department-container'>
            <h1>Departments</h1>
            <div className='addDepartmentBtn button' onClick={addDepartmentFunction}>Add Department</div>
            <table>
                <thead>
                    <tr>
                        <th>Sr. No. </th>
                        <th>Department Name</th>
                    </tr>
                </thead>
                <tbody>
                    {department && department.length > 0 ? (
                        department.map((d, index) => (
                            <React.Fragment key={d.id}>
                                <tr>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>
                                        <button className='view' onClick={() => fetchJobs(d.id)}>View All Jobs</button>
                                        <button className='view'>View Employees</button>
                                        <button className='edit'>Edit</button>
                                    </td>
                                </tr>
                                {departmentId === d.id && jobs && jobs.length > 0 && (
                                    <tr >
                                        <td colSpan="3" className='jobData'>
                                            <ul className='JobDepartmentContent'>
                                                {jobs.map((j, index) => (
                                                    <li key={index}><b>{index+1} - </b> {j.title}</li>
                                                ))}

                                                <button className='button jobBtn' onClick={() => addJobToDepartment()}>Add new Jobs &#8594; </button>
                                            </ul>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No departments found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {addDepartment && <div className='addDepartment'>
                <div className='closeBtn' onClick={closeAddDepartmentFunction}>x</div>
                <div className='data'>
                    <div className='heading'>
                        <h1>Department Name</h1>
                    </div>
                    <div className='InputData'>
                        <input type="text" id="departmentName" placeholder='Enter Department Name' />
                    </div>
                </div>
                <div className='data'>
                    <div className='heading'>
                        <h1>Job</h1>
                    </div>
                    <div className='InputData'>
                        <div className='tags'>
                            {jobTags.map((tag, index) => (
                                <div className='tagsTitle'>
                                    {tag}
                                    <button onClick={() => deleteTag(index)}>x</button>
                                </div>
                            ))}
                        </div>
                        <br />
                        <div className='jobInputField'>
                            <input value={input} placeholder='Enter a job' onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange} />
                        </div>
                    </div>
                </div>
                <button className='button' onClick={()=> addJobToDepartment()}>Add</button>
            </div>}

            {addJobSection && 
                <div className='addJob-section'>
                    <h1>Enter Job name that you wants to enter in {} Department</h1>
                    <div>
                        <input value={jobName} type = "text" placeholder='Enter Job Name' onChange={onChangeJobName}/>
                    </div>
                    <div>
                        <button className='view'>Add</button>
                        <button className='edit'>Cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Department
