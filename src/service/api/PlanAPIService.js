import axiosHttpService from "src/utils/httpService";
const API_PLAN = import.meta.env.VITE_API_PLAN;

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
    }
}

export default PlanAPIService;
