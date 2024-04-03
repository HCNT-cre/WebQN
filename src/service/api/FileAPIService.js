
import axiosHttpService from "src/utils/httpService";
import PlanAPIService from "./PlanAPIService";

const API_GOV_FILE_GET_ALL = import.meta.env.VITE_API_GOV_FILE_GET_ALL;
const API_GOV_FILE_SEARCH = import.meta.env.VITE_API_GOV_FILE_GET_ALL;
const API_UPDATE_STATE_GOV_FILE =
	import.meta.env.VITE_API_GOV_FILE_UPDATE_STATE;
const API_GET_FILE_BY_ORGAN_PLAN_NLLS = import.meta.env.VITE_API_GET_FILE_BY_ORGAN_PLAN_NLLS;
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
        let request = API_GOV_FILE_SEARCH 
        if(query !== "") request += "&" + query;
        console.log("request", request)
        const response = await axiosHttpService.get(request);
        return response.data;
    },

    getAllFile: async () => {
        const response = await axiosHttpService.get(API_GOV_FILE_GET_ALL + 1);
        return response.data;
    },

    updateState: async (newState) => {
        const response = await axiosHttpService.post(API_UPDATE_STATE_GOV_FILE, newState);
        return response.data;
    },

    getFileByPlanId: async (id) => {
        const response = await axiosHttpService.get(API_GOV_FILE_GET_ALL);
        const {data} = response;
        if(id === null) return data;
        const result = data.filter((file) => file.plan_bmcl === id || file.plan_nopluuls === id || file.plan_thuthap === id || file.plan_tieuhuy === id)
        return result;
    },

    updateStateByIdPlan: async (id, newState) => {
        const files = await FileAPIService.getFileByPlanId(id);
        const updatedState = [];
        for(let file of files) {
            updatedState.push({
                ...newState,
                id: file.id,
            })
        }
        await FileAPIService.updateState(updatedState);
    },

    getFileOfNLLSPlanByOrganId: async(planId, organId) => {
        const files = await axiosHttpService.get(API_GET_FILE_BY_ORGAN_PLAN_NLLS + '/' + planId + '/' + organId);
        return files.data;
    }   
}   

export default FileAPIService;
