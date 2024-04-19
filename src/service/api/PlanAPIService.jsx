import {ENUM_TYPE_PLAN} from "src/storage/Storage";
import axiosHttpService from "src/utils/httpService";
import {AddWatchTheoDoiNopLuuLichSu} from "../helper/Plan";
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
const API_CREATE_ATTACHMENT = import.meta.env.VITE_API_CREATE_ATTACHMENT;
const API_GET_PLAN_SO_NOI_VU_DUYET = import.meta.env.VITE_API_GET_PLAN_SO_NOI_VU_DUYET;
const API_DUYET_NOI_VU_PLAN = import.meta.env.VITE_API_DUYET_NOI_VU_PLAN;
const API_GET_CHO_XEP_KHO_LICH_SU_PLAN = import.meta.env.VITE_API_GET_CHO_XEP_KHO_LICH_SU_PLAN;
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
        return await axiosHttpService.get(API_GET_FILE_BY_PLAN_NNLS_ID + id);
    },

    getFileByPlanTieuHuyId: async (id) => {
        return await axiosHttpService.get(API_GET_FILE_BY_PLAN_TIEUHUY_ID + id);
    },

    removeFileFromPlan: async (idFile) => {
        return await axiosHttpService.post(API_REMOVE_FILE_FROM_PLAN, {
            gov_file_id: idFile
        });
    },

    removeFileFromPlanTieuHuy: async (idFile) => {
        return await axiosHttpService.post(API_REMOVE_FILE_FROM_PLAN_TIEUHUY, {
            gov_file_id: idFile
        });
    },

    setPlanForFile: async (payload) => {
        return await axiosHttpService.post(API_SET_PLAN_FOR_FILE, payload);
    },

    setPlanTieuHuyForFile: async (payload) => {
        return await axiosHttpService.post(API_SET_PLAN_TIEU_HUY_FOR_FILE, payload);
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
                watch: <AddWatchTheoDoiNopLuuLichSu item={plan} />,
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
    updateStateNLLSOrgan: async (planId, organId, newState) => {
        const response = await axiosHttpService.post(API_UPDATE_STATE_NLLS_ORGAN, {
            plan_id: planId,
            organ_id: organId,
            state: newState
        });
        return response.data;
    },

    updatePlan: async (id, payload) => {
        const res = await axiosHttpService.put(API_PLAN + '/' + id, payload);
        return res.data;
    },

    addAttachmentToPlan: async (id, payload) => {
        const res = await axiosHttpService.post(API_CREATE_ATTACHMENT + '/' + id, payload, {
            headers: {
                'Accept': 'application/json',
                "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
            }
        });
        return res.data;
    },

    getSoNoiVuDuyetPlan: async () => {
        const res = await axiosHttpService.get(API_GET_PLAN_SO_NOI_VU_DUYET);
        return res.data;
    },

    getChoXepKhoLichSuPlan: async () => {
        const res = await axiosHttpService.get(API_GET_CHO_XEP_KHO_LICH_SU_PLAN);
        return res.data;
    },

    approvePlanNLLS: async (planIds) => {
        const res = await axiosHttpService.post(API_DUYET_NOI_VU_PLAN, {
            "plan_ids": planIds
        })
        return res.data
    },
}

export default PlanAPIService;
