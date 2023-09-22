import BasePage from "../BasePage";
import { useState, useEffect, useCallback } from "react";
import axiosHttpService from "src/utils/httpService";

const API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL = import.meta.env.VITE_API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL

export const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "150%" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id", width: "100%" },
    { title: "Kho", key: "warehouse", width: "100%" },
    { title: "Phòng kho", key: "warehouseroom", width: "100%" },
    { title: "Kệ", key: "shelf", width: "100%" },
    { title: "Tầng", key: "drawers", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "Trạng thái", key: "state", width: "130%" },
    { title: "Chức năng", key: "Function", width: "120px" },
]
const KhoLuuTruLichSu = () => {

    const [allOrganStorageFiles, setAllOrganStorageFiles] = useState([])

    const parent = [
        { title: "Lưu trữ lịch sử", link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop" },
    ]

    const current = {
        link: "/luu-tru-lich-su/kho-luu-tru-lich-su",
        title: "Kho lưu trữ lịch sử"
    }

    const fetchAllOrganStorageFiles = async () => {
        const res = await axiosHttpService.get(API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL)
        setAllOrganStorageFiles(res.data)
    }

    useEffect(() => {
        fetchAllOrganStorageFiles()
    }, [])

    const mergeTwoFile = (file, fileS) => {
        const newFile = {
            'id': file.id,
            'gov_file_code': file.gov_file_code,
            'title': file.title,
            'organ_id': file.organ_id,
            'warehouse': fileS.warehouse,
            'warehouseroom': fileS.warehouseroom,
            'shelf': fileS.shelf,
            'drawers': fileS.drawers,
            'maintenance': file.maintenance,
            'rights': file.rights,
            'state': file.state,
            'Function': file.Function
        }

        return newFile
    }


    const filter = useCallback((files) => {
        console.log(files)
        if (!allOrganStorageFiles.length) return files
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === "Lưu trữ lịch sử") {
                for (const fileS of allOrganStorageFiles) {
                    console.log(fileS.file_id, file.id)
                    if (fileS.file_id === file.id)
                        newFiles.push(mergeTwoFile(file, fileS))
                }
            }
        }
        return newFiles
    }, [allOrganStorageFiles]);

    return <BasePage parent={parent} current={current} filter={filter} fieldsTableCustom={FIELDS_TABLE} />

}

export default KhoLuuTruLichSu;
