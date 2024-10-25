import React,{useState} from 'react';
import { addDepartmentWithJobs} from '../../../departmentService';

export default function AddDepartment({setOverlay,setShowDepartmentSection}) {
    const [jobTags, setJobTags] = useState([]);
    const [input, setInput] = useState('');
    const [departmentName, setDepartmentName] = useState('');

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

    const addDepartment = async() => {
        const departmentDetails = {
            name: departmentName,
            jobs: jobTags
        };
        await addDepartmentWithJobs(departmentDetails);
    }

    const deleteTag = (index) => {
        setJobTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    const closeDepartmentSection = () => {
        setOverlay(false);
        setShowDepartmentSection(false);
    }
    const handleJobTagChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };


  return (
    <div className='addDepartment'>
                        <div className='closeBtn' onClick={closeDepartmentSection}>x</div>
                        <div className='data'>
                            <div className='heading'>
                                <h1>Department Name</h1>
                            </div>
                            <div className='InputData'>
                                <input value={departmentName} type="text" id="departmentName" placeholder='Enter Department Name' onChange={(e)=>setDepartmentName(e.target.value)}/>
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
                        <button className='button' onClick={addDepartment}>Add</button>
                    </div>
  )
}
