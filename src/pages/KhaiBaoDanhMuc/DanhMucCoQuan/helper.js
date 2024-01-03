import { TABS_SIDEBAR } from "src/storage/Storage";
import axiosHttpService from "src/utils/httpService"
const API_STORAGE_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN
const API_ORGAN_GET_SINGLE_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_SINGLE_DEPARTMENT;

export const getOrganbyId = async (id) => {
    const res = await axiosHttpService.get(API_STORAGE_GET_ORGAN + '/' + id);
    return res.data;
}

export const getDepartmentbyId = async (id) => {
    const res = await axiosHttpService.get(API_ORGAN_GET_SINGLE_DEPARTMENT + '/' + id);
    return res.data;
}

export const getAllPermissionsRelate = (group) => {
    let listPermissionOfGroup = [group];
    for(const item of TABS_SIDEBAR) {
        if(item.childTabs) {
            for(const child of item.childTabs) {
                if(item.number == group) listPermissionOfGroup.push(child.number);
                if((item.number == group || child.number == group) && child.childTabs) {
                    for(const child2 of child.childTabs) {
                        listPermissionOfGroup.push(child2.number);
                    }
                }
            }
        }
    }
    return listPermissionOfGroup;
}
