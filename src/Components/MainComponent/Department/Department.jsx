import React,{useState} from 'react';
import './Department.scss';

const Department = () => {

    const[addDepartment , setAddDepartment] = useState(false);
    const[isKeyReleased , setIsKeyReleased] = useState(false);
    const[jobTags, setJobTags] = useState([]);
    const[input, setInput] = useState('');

    const addDepartmentFunction = () => {
        setAddDepartment(true);
    }

    const closeAddDepartmentFunction = () => {
        setAddDepartment(false);
    }

    const onChange = (e) => {
        const {value} = e.target;
        setInput(value);
    }

    const onKeyDown = (e) => {
        const {key} = e;
        const trimmedInput = input.trim();
        if((key === ',' || key ==='Enter') && trimmedInput.length && !jobTags.includes(trimmedInput)){
            e.preventDefault();
            setJobTags(prevState => [...prevState , trimmedInput]);
            setInput('');
        }
        if(key === 'Backspace' && !input.length && jobTags.length){
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
        setJobTags(prevState => prevState.filter((tag,i)=> i !== index))
    }

  return (
    <div className='department-container'>
        <h1>Departments</h1>
        <div className='addDepartmentBtn button' onClick={addDepartmentFunction}>Add Department</div>
        <table>
            <tr>
                <th>Sr. No. </th>
                <th>Department Name</th>
            </tr>
            <tr>
                <td>1</td>
                <td>IT</td>
                <td>
                    <button className='view'>View All Jobs</button>
                    <button className='view'>View Employees</button>
                    <button className='edit'>Edit</button>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>Sales</td>
                <td>
                    <button className='view'>View All Jobs</button>
                    <button className='view'>View Employees</button>
                    <button className='edit'>Edit</button>
                </td>
            </tr>
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
                        {jobTags.map((tag,index) => (
                            <div className='tagsTitle'>
                                {tag}
                                <button onClick={() => deleteTag(index)}>x</button>
                            </div>
                        ))}
                    </div>
                    <br/>
                    <div className='jobInputField'>
                        <input value={input} placeholder='Enter a job' onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange}/>
                    </div>
                </div>
            </div>
            <button className='button'>Add</button>
        </div>}
    </div>
  )
}

export default Department
