import axiosHttpService from "src/utils/httpService";

const API_STORAGE_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN
const API_ORGAN_GET_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT;
const API_ORGAN_GET_DEPARTMENT_BY_ORGAN = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN
const API_ORGAN_POST_DEPARTMENT = import.meta.env.VITE_API_ORGAN_POST_DEPARTMENT;
const KhaiBaoDanhMucAPIService = {
    getOrganById: async (id) => {
        const res = await axiosHttpService.get(API_STORAGE_GET_ORGAN + '/' + id);
        return res.data;
    },

    getDepartmentById: async (id) => {
        const res = await axiosHttpService.get(API_ORGAN_GET_DEPARTMENT + '/' + id);
        return res.data;
    },

    getDepartmentByOrganId: async (id) => {
        const res = await axiosHttpService.get(API_ORGAN_GET_DEPARTMENT_BY_ORGAN + '/' + id);
        return res.data;
    },

    updateDepartment: async (id, data) => {
        const res = await axiosHttpService.put(API_ORGAN_POST_DEPARTMENT + '/' + id, data);
        return res.data;
    },

    createDepartment: async (data) => {
        const res = await axiosHttpService.post(API_ORGAN_POST_DEPARTMENT, data);
        return res.data;
    }
};

export default KhaiBaoDanhMucAPIService;
