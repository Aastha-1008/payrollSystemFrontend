import axiosInstance from './AxiosInstance';


export const getJobByDepartmentId = async (departmentId) => {
    try{
        const response = await axiosInstance.get(`/job/${departmentId}`);
        return response.data;
    }catch(error){
        console.log(`Error fetching jobs for ${departmentId}` , error);
        throw error;
    }
};

export const addJobToDepartment = async (id, name) => {
    try{
        const response = await axiosInstance.post(`/job/${id}/${name}`, { headers: {
            'Content-Type': 'application/json'
        }});
        return response.data;
    }catch(error){
        console.log(`Error in adding new jobs`);
        throw error;
    }
}