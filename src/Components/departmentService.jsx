import axiosInstance from './AxiosInstance';


export const getDepartments = async () => {
    try{
        const response = await axiosInstance.get('/department/');
        return response.data;
    }catch(error){
        console.log("Error fetching employees" , error);
        throw error;
    }
};

export const addDepartmentWithJobs = async (departmentDetails) => {
    console.log(departmentDetails);
    try{
        const response = await axiosInstance.post('/department/',departmentDetails , {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }catch(error){
        console.log("Error in adding department with job tags");
    }
}