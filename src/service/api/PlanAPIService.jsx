import { ENUM_TYPE_PLAN } from "src/storage/Storage";
import axiosHttpService from "src/utils/httpService";
import { AddWatchTheoDoiNopLuuLichSu } from "../helper/Plan";
import UserAPIService from "./userAPIService";
const API_PLAN = import.meta.env.VITE_API_PLAN;
const API_GET_FILE_BY_PLAN_NNLS_ID = import.meta.env.VITE_API_GET_FILE_BY_PLAN_NNLS_ID;
const API_REMOVE_FILE_FROM_PLAN = import.meta.env.VITE_API_REMOVE_FILE_FROM_PLAN;
const API_SET_PLAN_FOR_FILE = import.meta.env.VITE_API_SET_PLAN_FOR_FILE;
const API_SET_PLAN_TIEU_HUY_FOR_FILE = import.meta.env.VITE_API_SET_PLAN_TIEU_HUY_FOR_FILE;
const API_GET_FILE_BY_PLAN_TIEUHUY_ID = import.meta.env.VITE_API_GET_FILE_BY_PLAN_TIEUHUY_ID;
const API_REMOVE_FILE_FROM_PLAN_TIEUHUY = import.meta.env.VITE_API_REMOVE_FILE_FROM_PLAN_TIEUHUY;
const API_SEND_NLLS_INTERNAL = import.meta.env.VITE_API_SEND_NLLS_INTERNAL
const API_SEND_NLLS_ORGAN = import.meta.env.VITE_API_SEND_NLLS_ORGAN
const API_GET_NLLS_INTERNAL = import.meta.env.VITE_API_GET_NLLS_INTERNAL
const API_GET_NLLS_ORGAN = import.meta.env.VITE_API_GET_NLLS_ORGAN
const API_GET_SENT_PLAN_NLLS_BY_SENDER_ID = import.meta.env.VITE_API_GET_SENT_PLAN_NLLS_BY_SENDER_ID
const API_UPDATE_STATE_NLLS_ORGAN = import.meta.env.VITE_API_UPDATE_STATE_NLLS_ORGAN

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

    getFileByPlanTieuHuyId: async (id) => {
        const response = await axiosHttpService.get(API_GET_FILE_BY_PLAN_TIEUHUY_ID + id);
        return response;
    },

    removeFileFromPlan: async (idFile) => {
        const response = await axiosHttpService.post(API_REMOVE_FILE_FROM_PLAN, {
            gov_file_id: idFile
        });
        return response;
    },

    removeFileFromPlanTieuHuy: async (idFile) => {
        const response = await axiosHttpService.post(API_REMOVE_FILE_FROM_PLAN_TIEUHUY, {
            gov_file_id: idFile
        });
        return response;
    },

    setPlanForFile: async (payload) => {
        const response = await axiosHttpService.post(API_SET_PLAN_FOR_FILE , payload);
        return response;
    },

    setPlanTieuHuyForFile: async (payload) => {
        const response = await axiosHttpService.post(API_SET_PLAN_TIEU_HUY_FOR_FILE , payload);
        return response;
    },

    getDeletePlan: async () => {
        const response = await axiosHttpService.get(API_PLAN);
        return response.data.filter((plan) => plan.type === ENUM_TYPE_PLAN.QUYET_DINH_TIEU_HUY);
    },

    createPlan: async (payload) => {
        const response = await axiosHttpService.post(API_PLAN, payload);
        return response.data;
    },

    getOrganByPlanId: async (id) => {
        const response = await axiosHttpService.get(API_PLAN + '/' + id);
        return [{
            id: response.data.organ,
            plan_name: response.data.name,
            organ_name: response.data.organ_name,
            progress: "", // t is short for temp
        }];
    },

    getOrganByPlan: async () => {
        const response = await axiosHttpService.get(API_PLAN);
        return response.data.map((plan) => {
            return {
                id: plan.organ,
                plan_name: plan.name,
                organ_name: plan.organ_name,
                progress: "", // t is short for temp
                watch: <AddWatchTheoDoiNopLuuLichSu item={plan}/>,
            }
        })
    },

    sendNLLSPLanInternal: async (planIds, approverIds) => {
        const userInfo = await UserAPIService.getUserInfo();
        const response = await axiosHttpService.post(API_SEND_NLLS_INTERNAL, {
            "sender_id": userInfo.id,
            "approver_ids": approverIds,
            "plan_ids": planIds,
        })
        return response.status != 200 ? Error("Send NLLS Internal Error") : null
    },

    getNLLSPlanInternal: async () => {
        const userInfo = await UserAPIService.getUserInfo();
        const response = await axiosHttpService.get(API_GET_NLLS_INTERNAL + '/' + userInfo.id)
        return response.data
    },

    getSentNLLSPlan: async () => {
        const userInfo = await UserAPIService.getUserInfo();
        const response = await axiosHttpService.get(API_GET_SENT_PLAN_NLLS_BY_SENDER_ID + '/' + userInfo.id)
        return response.data
    },

    sendNLLSPLanOrgan: async (planIds, organIds) => {
        const userInfo = await UserAPIService.getUserInfo();
        const organ = await UserAPIService.getUserOrgan();
        const response = await axiosHttpService.post(API_SEND_NLLS_ORGAN, {
            "sender_id": userInfo.id,
            "organ_ids": organIds,
            "plan_ids": planIds,
            "organ_sender_id": organ.id
        })
        return response.status != 200 ? Error("Send NLLS organ Error") : null
    },

    getNLLSPlanByOrgan: async () => {
        const organ = await UserAPIService.getUserOrgan()
        const response = await axiosHttpService.get(API_GET_NLLS_ORGAN + '/' + organ.id)
        return response.data
    },
    updateStateNLLSOrgan : async (planId, organId, newState) => {
        const response = await axiosHttpService.post(API_UPDATE_STATE_NLLS_ORGAN, {
            plan_id: planId,
            organ_id: organId,
            state: newState
        });
        return response.data;
    }

}

export default PlanAPIService;
