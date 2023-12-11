
import axiosHttpService from "src/utils/httpService";

const API_GOV_FILE_GET_ALL = import.meta.env.VITE_API_GOV_FILE_GET_ALL;
const API_GOV_FILE_SEARCH = import.meta.env.VITE_API_GOV_FILE_GET_ALL;

const FileAPIService = {
    getFileByTitle: async (title) => {
        const response = await axiosHttpService.get(`${API_GOV_FILE_SEARCH}title=${title}`)
        return response.data;
    },

    getFileById: async (id) => {
        const response = await axiosHttpService.get(`${API_GOV_FILE_GET_ALL}id=${id}`)
        return response.data;
    },

    searchFile: async (query) => {        
        let request = API_GOV_FILE_SEARCH + 1 + "&" + query;
        const response = await axiosHttpService.get(request);
        return response.data;
    },

    getAllFile: async () => {
        const response = await axiosHttpService.get(API_GOV_FILE_GET_ALL + 1);
        return response.data;
    },
    
}   

export default FileAPIService;
