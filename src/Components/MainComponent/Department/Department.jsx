import React, { useEffect, useState, useCallback } from 'react';
import './Department.scss';
import { getDepartments } from '../../departmentService';
import { getJobByDepartmentId } from '../../jobService';

const Department = () => {
    const [showDepartmentSection, setShowDepartmentSection] = useState(false);
    const [showJobSection, setShowJobSection] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState({ id: null, name: null });
    const [jobTags, setJobTags] = useState([]);
    const [input, setInput] = useState('');
    const [departments, setDepartments] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        document.body.classList.toggle('freeze-background', showDepartmentSection || showJobSection);
    }, [showDepartmentSection, showJobSection]);

    const fetchDepartments = async () => {
        try {
            const departments = await getDepartments();
            setDepartments(departments);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const fetchJobs = async (departmentId, departmentName) => {
        setSelectedDepartment({ id: departmentId, name: departmentName });
        try {
            const jobsInDepartment = await getJobByDepartmentId(departmentId);
            setJobs(jobsInDepartment);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleJobTagChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const handleKeyDown = (e) => {
        const trimmedInput = input.trim();
        if ((e.key === ',' || e.key === 'Enter') && trimmedInput && !jobTags.includes(trimmedInput)) {
            e.preventDefault();
            setJobTags((prevTags) => [...prevTags, trimmedInput]);
            setInput('');
        } else if (e.key === 'Backspace' && !input && jobTags.length) {
            e.preventDefault();
            setJobTags((prevTags) => prevTags.slice(0, -1));
        }
    };

    const deleteTag = (index) => {
        setJobTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    const toggleShowDepartmentSection = () => {
        setShowDepartmentSection((prev) => !prev);
    };

    const toggleShowJobSection = () => {
        setShowJobSection((prev) => !prev);
    };

    return (
        <div className='department-container'>
            <h1>Departments</h1>
            <div className='addDepartmentBtn button' onClick={toggleShowDepartmentSection}>Add Department</div>
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
                                                <button className='button jobBtn' onClick={toggleShowJobSection}>Add new Jobs &#8594;</button>
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
                <div className='addDepartment'>
                    <div className='closeBtn' onClick={toggleShowDepartmentSection}>x</div>
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
                                    <div className='tagsTitle' key={index}>
                                        {tag}
                                        <button onClick={() => deleteTag(index)}>x</button>
                                    </div>
                                ))}
                            </div>
                            <div className='jobInputField'>
                                <input value={input} placeholder='Enter a job' onKeyDown={handleKeyDown} onChange={handleJobTagChange} />
                            </div>
                        </div>
                    </div>
                    <button className='button' onClick={toggleShowJobSection}>Add</button>
                </div>
            )}

            {showJobSection && (
                <div className='addJob-section'>
                    <div className='closeBtn' onClick={toggleShowJobSection}>x</div>
                    <h1>Enter Job name that you want to enter in {selectedDepartment.name} Department</h1>
                    <div>
                        <input value={input} type="text" placeholder='Enter Job Name' onChange={handleJobTagChange} />
                    </div>
                    <div>
                        <button className='view'>Add</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Department;
