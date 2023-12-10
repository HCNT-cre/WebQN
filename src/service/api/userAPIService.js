import axiosHttpService from "src/utils/httpService";
const API_USERINFO = import.meta.env.VITE_API_USER_INFO;
const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
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
            const response = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL + '/' + departmentId);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

export default UserAPIService;
