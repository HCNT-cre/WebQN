/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";
import { ENUM_STATE_BMCL, ENUM_STATE_FILE } from "src/storage/Storage";
import { useCallback, useEffect, useState } from "react";
import axiosHttpService from "src/utils/httpService";
const API_DOCUMENT_MODIFICATION_REJECT = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_REJECT

const PheDuyetLuuKho = () => {
    const [fileIds, setFileIds] = useState([])

    useEffect(() => {
        const getDocumentReject = async () => {
            const response = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT)
            const data = response.data
            setFileIds(data)
        }
        getDocumentReject()
    }, [])

    const parent = [
        { title: "Biên mục chỉnh lý", link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly" },
    ]

    const current = {
        link: "/luu-tru-co-quan/phe-duyet-luu-kho",
        title: "Phê duyệt lưu kho"
    }

    const filter = useCallback((files) => {
        if (!fileIds.length) return files
        console.log(fileIds)
        const existFiles = {}
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.NOP_LUU_CO_QUAN) {
                for(const fileS of fileIds) {
                    if(fileS.idFile !== file.id && !existFiles[file.id]) {
                        newFiles.push(file)
                        existFiles[file.id] = true
                    }
                }
            }
        }
        return newFiles
    }, [fileIds]);


    return <BasePage
        parent={parent}
        current={current}
        filter={filter}
        isCheckBox={false}
        buttonFuctions={<ButtonFuctions />}
        currentStateModal={ENUM_STATE_BMCL.BMCL_PHE_DUYET_LUU_KHO}
        eOffice={false} />
}

export default PheDuyetLuuKho;
