
import axiosHttpService from "src/utils/httpService";
const API_ORGAN_BY_CATEGORY_FILE = import.meta.env.VITE_API_ORGAN_BY_CATEGORY_FILE
const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL

const OrganAPIService = {
    getAllOrgan: async () => {
        try {
            const response = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    getOrganByCategoryFileYear: async (year) => {
        const response = await axiosHttpService.get(API_ORGAN_BY_CATEGORY_FILE + '/' + year);
        return response.data;
    },
    getOrganById: async (id) => {
        const response = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL + '/' + id);
        return response.data;
    }
}

export default OrganAPIService;
