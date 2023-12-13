import axiosHttpService from "src/utils/httpService";
const API_PLAN = import.meta.env.VITE_API_PLAN;
const API_GET_FILE_BY_PLAN_NNLS_ID = import.meta.env.VITE_API_GET_FILE_BY_PLAN_NNLS_ID;
const API_REMOVE_FILE_FROM_PLAN = import.meta.env.VITE_API_REMOVE_FILE_FROM_PLAN;
const PlanAPIService = {
    getPlanById: async (id) => {
        const response = await axiosHttpService.get(API_PLAN + '/' + id);
        return response.data;
    },

    updateStatePlan: async (id, newState) => {
        const plan = await PlanAPIService.getPlanById(id);
        plan["state"] = newState;
        const response = await axiosHttpService.put(API_PLAN + '/' + id, plan);
        return response.data;
    },

    getFileByPlanNLLSId: async (id) => {
        const response = await axiosHttpService.get(API_GET_FILE_BY_PLAN_NNLS_ID + id);
        return response;
    },

    removeFileFromPlan: async (idFile) => {
        const response = await axiosHttpService.post(API_REMOVE_FILE_FROM_PLAN, {
            gov_file_id: idFile
        });
        return response;
    }
}

export default PlanAPIService;
