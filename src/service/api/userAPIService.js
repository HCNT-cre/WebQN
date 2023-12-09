import axiosHttpService from "src/utils/httpService";
const API_USERINFO = import.meta.env.VITE_API_USER_INFO;

const UserAPIService = {
    getUserInfo: async () => {
        try {
            const response = await axiosHttpService.get(API_USERINFO);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

export default UserAPIService;
