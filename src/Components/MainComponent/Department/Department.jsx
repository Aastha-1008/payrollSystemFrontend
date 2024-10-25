import React, { useEffect, useState, useCallback } from 'react';
import './Department.scss';
import { getDepartments } from '../../departmentService';
import { getJobByDepartmentId } from '../../jobService';
import AddDepartment from './AddDepartment/AddDepartment';

const Department = () => {
    const [overlay , setOverlay] = useState(false);
    const [showDepartmentSection, setShowDepartmentSection] = useState(false);
    const [showJobSection, setShowJobSection] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState({ id: null, name: null });
    const [departments, setDepartments] = useState([]);
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const departments = await getDepartments();
            setDepartments(departments);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const fetchJobs = async (departmentId, departmentName) => {
        setJobs(false);
        setSelectedDepartment({ id: departmentId, name: departmentName });
        try {
            const jobsInDepartment = await getJobByDepartmentId(departmentId);
            setJobs(jobsInDepartment);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };




    const openJobSection = () => {
        setOverlay(true);
        setShowJobSection(true);
    }

    const openDepartmentSection = () => {
        setOverlay(true);
        setShowDepartmentSection(true);
    }
    const closeJobSection = ( )=> {
        setOverlay(false);
        setShowJobSection(false);
    }


    return (
        <>
            {overlay && <div className="overlay"></div>}

            <div className='department-container'>

                <h1>Departments</h1>
                <div className='addDepartmentBtn button' onClick={openDepartmentSection}>Add Department</div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Department Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.length > 0 ? (
                            departments.map((department, index) => (
                                <React.Fragment key={department.id}>
                                    <tr>
                                        <td>{department.id}</td>
                                        <td>{department.name}</td>
                                        <td>
                                            <button className='view' onClick={() => fetchJobs(department.id, department.name)}>View All Jobs</button>
                                            <button className='view'>View Employees</button>
                                            <button className='edit'>Edit</button>
                                        </td>
                                    </tr>
                                    {selectedDepartment.id === department.id && jobs.length > 0 && (
                                        <tr>
                                            <td colSpan="3" className='jobData'>
                                                <ul className='JobDepartmentContent'>
                                                    {jobs.map((job, jobIndex) => (
                                                        <li key={jobIndex}><b>{jobIndex + 1} - </b> {job.title}</li>
                                                    ))}
                                                    <button className='button jobBtn' onClick={openJobSection}>Add new Jobs &#8594;</button>
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

                {showDepartmentSection && (
                    <AddDepartment setOverlay={setOverlay} setShowDepartmentSection={setShowDepartmentSection}/>
                )}

                {showJobSection && (
                    <div className='addJob-section'>
                        <div className='closeBtn' onClick={closeJobSection}>x</div>
                        <h1>Enter Job name that you want to enter in {selectedDepartment.name} Department</h1>
                        <div>
                            <input type="text" placeholder='Enter Job Name'  />
                        </div>
                        <div>
                            <button className='view'>Add</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Department;
