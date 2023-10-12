import { useEffect } from "react";
import axiosHttpService from "src/utils/httpService";
import BasePage from "src/pages/BasePage";
import { useState, useCallback } from "react";
const API_DOCUMENT_MODIFICATION_REJECT = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_REJECT

const BoSungHoSoTaiLieu = () => {
    const [fileIds, setFileIds] = useState([])

    const parent = [
        {
            title: "Biên mục chỉnh lý",
            link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
        },
        {
            title: "Biên mục bổ sung",
            link: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu",
        },
    ];

    const current = {
        link: "/bien-muc-chinh-ly/bien-muc-ho-so",
        title: "Biên mục hồ sơ",
    };
    useEffect(() => {
        const getDocumentReject = async () => {
            const response = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT)
            const data = response.data
            setFileIds(data)
        }
        getDocumentReject()
    }, [])

    const filter = useCallback((files) => {
        if (!fileIds.length) return files
        const existFiles = {}
        const newFiles = []
        for (const file of files) {
            for (const fileS of fileIds) {
                if (fileS.idFile === file.id && !existFiles[file.id]) {
                    newFiles.push(file)
                    existFiles[file.id] = true
                }
            }

        }
        return newFiles
    }, [fileIds]);

    return (
        <BasePage
            parent={parent}
            current={current}
            addNewFile={true}
            filter={filter}
            eOffice={false}
        />
    );
};

export default BoSungHoSoTaiLieu;
