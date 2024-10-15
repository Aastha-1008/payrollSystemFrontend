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

