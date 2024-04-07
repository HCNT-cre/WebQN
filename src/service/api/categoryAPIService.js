import axiosHttpService from "src/utils/httpService";
const API_CATEGORY_FILE_YEARS = import.meta.env.VITE_API_CATEGORY_FILE_YEARS
const API_CATEGORY_FILE_BY_ORGAN_AND_YEARS = import.meta.env.VITE_API_CATEGORY_FILE_BY_ORGAN_AND_YEARS
const CATEGORY_FILE_API = import.meta.env.VITE_CATEGORY_FILE_API

const CategoryAPIService = {
    getCategoryFileYears: async () => {
        const response = await axiosHttpService.get(API_CATEGORY_FILE_YEARS)
        return response.data
    },

    getCategoryFileByOrganAndYear: async (organId, year) => {
        const response = await axiosHttpService.get(API_CATEGORY_FILE_BY_ORGAN_AND_YEARS + '/' + year + '/' + organId)
        return response.data
    },

    createCategoryFile: async (data) => {
        const response = await axiosHttpService.post(CATEGORY_FILE_API, data)
        return response.data
    },
}

export default CategoryAPIService;
