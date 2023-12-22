import axiosHttpService from "src/utils/httpService";

const API_STORAGE_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN
const API_ORGAN_GET_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT;
const API_ORGAN_GET_DEPARTMENT_BY_ORGAN = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN
const API_ORGAN_POST_DEPARTMENT = import.meta.env.VITE_API_ORGAN_POST_DEPARTMENT;
const API_STORAGE_POST_ORGAN = import.meta.env.VITE_API_STORAGE_POST_ORGAN
const API_GET_WAREHOUSE_BY_ORGAN = import.meta.env.VITE_API_GET_WAREHOUSE_BY_ORGAN
const API_STORAGE_GET_WAREHOUSE = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSE;
const API_STORAGE_GET_WAREHOUSEROOM = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSEROOM;
const API_GET_WAREHOUSE_ROOM_BY_WAREHOUSE = import.meta.env.VITE_API_GET_WAREHOUSE_ROOM_BY_WAREHOUSE;
const API_GET_SHELF = import.meta.env.VITE_API_STORAGE_GET_SHELF;
const API_GET_SHELF_BY_WAREHOUSE_ROOM = import.meta.env.VITE_API_GET_SHELF_BY_WAREHOUSE_ROOM;
const API_STORAGE_GET_DRAWERS = import.meta.env.VITE_API_STORAGE_GET_DRAWERS;
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
    },

    deleteOrgan: async (id) => {
        const res = await axiosHttpService.delete(API_STORAGE_POST_ORGAN + '/' + id);
        return res.data;
    },

    getWarehouseByOrganId: async (organId) => {
        const response = await axiosHttpService.get(API_GET_WAREHOUSE_BY_ORGAN + '/' + organId);
        return response.data;
    },

    getWarehouseById: async (id) => {
        const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSE + '/' + id);
        return response.data;
    },

    deleteWareHouseById: async (id) => {
        const response = await axiosHttpService.delete(API_STORAGE_GET_WAREHOUSE + '/' + id);
        return response.data;
    },

    getWarehouseRoomById: async (id) => {
        const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSEROOM + '/' + id);
        return response.data;
    },

    updateWarehouseById: async (id, data) => {
        const response = await axiosHttpService.put(API_STORAGE_GET_WAREHOUSE + '/' + id, data);
        return response.data;
    },

    updateWarehouseRoomById: async (id, data) => {
        const response = await axiosHttpService.put(API_STORAGE_GET_WAREHOUSEROOM + '/' + id, data);
        return response.data;
    },

    getWarehouseRoomByWarehouseId: async (warehouseId) => {
        const response = await axiosHttpService.get(API_GET_WAREHOUSE_ROOM_BY_WAREHOUSE + '/' + warehouseId);
        return response.data;
    },

    getShelfById: async (id) => {
        const response = await axiosHttpService.get(API_GET_SHELF + '/' + id);
        return response.data;
    },

    updateShelfById: async (id, data) => {
        const response = await axiosHttpService.put(API_GET_SHELF + '/' + id, data);
        return response.data;
    },

    deleteShelfById: async (id) => {
        const response = await axiosHttpService.delete(API_GET_SHELF + '/' + id);
        return response.data;
    },

    getShelfByWarehouseRoomId: async (warehouseRoomId) => {
        const response = await axiosHttpService.get(API_GET_SHELF_BY_WAREHOUSE_ROOM + '/' + warehouseRoomId);
        return response.data;
    },

    getDrawerById: async (id) => {
        const response = await axiosHttpService.get(API_STORAGE_GET_DRAWERS + '/' + id);
        return response.data;
    },

    updateDrawerById: async (id, data) => {
        const response = await axiosHttpService.put(API_STORAGE_GET_DRAWERS + '/' + id, data);
        return response.data;
    },

    deleteDrawerById: async (id) => {
        const response = await axiosHttpService.delete(API_STORAGE_GET_DRAWERS + '/' + id);
        return response.data;
    },

};

export default KhaiBaoDanhMucAPIService;
