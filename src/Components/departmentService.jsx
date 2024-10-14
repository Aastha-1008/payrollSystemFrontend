import axiosInstance from './AxiosInstance';


export const getDepartments = async () => {
    try{
        const response = await axiosInstance.get('/department/');
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log("Error fetching employees" , error);
        throw error;
    }
};