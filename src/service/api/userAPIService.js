import axiosHttpService from "src/utils/httpService";

const API_USERINFO = import.meta.env.VITE_API_USER_INFO;
const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
const API_ORGAN_GET_SINGLE_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_SINGLE_DEPARTMENT;
const API_GET_USER_BY_ID = import.meta.env.VITE_API_GET_USER_BY_ID;
const API_POST_USER = import.meta.env.VITE_API_ORGAN_POST_STAFF;
const API_UPDATE_USER_PASSWORD = import.meta.env.VITE_API_UPDATE_USER_PASSWORD;
const API_GET_ALL_USER_BY_ORGAN_ID = import.meta.env.VITE_API_GET_ALL_USER_BY_ORGAN_ID;
const UserAPIService = {
    getUserInfo: async () => {
        try {
            const response = await axiosHttpService.get(API_USERINFO);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    getUserOrgan: async () => {
        try {
            const userInfo = await axiosHttpService.get(API_USERINFO);
            const departmentId = userInfo.data.department;
            const departmentInfo = await axiosHttpService.get(API_ORGAN_GET_SINGLE_DEPARTMENT + '/' + departmentId);
            const organId = departmentInfo.data.organ;
            const response = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL + '/' + organId);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    getUserById: async (id) => {
        try {
            const response = await axiosHttpService.get(API_GET_USER_BY_ID + '/' + id);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    updateUserById: async (id, data) => {
        try {
            const response = await axiosHttpService.put(API_GET_USER_BY_ID + '/' + id, data);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    createUser: async (data) => {
        try {
            const response = await axiosHttpService.post(API_POST_USER, data);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    changePassword: async (data, id) => {
        try {
            await axiosHttpService.post(API_UPDATE_USER_PASSWORD + '/' + id, data);
            return "suceess";
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    deleteUserById: async (id) => {
        try{
            const response = await axiosHttpService.delete(API_GET_USER_BY_ID + '/' + id);
            return response.data;
        }catch(err){
            console.log(err);
            return null;
        }   
    },

    getAllUserByOrganID: async (id) => {
        try {
            const response = await axiosHttpService.get(API_GET_ALL_USER_BY_ORGAN_ID + '/' + id);
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
}

export default UserAPIService;
