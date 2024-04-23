/* eslint-disable react-hooks/exhaustive-deps */
import PheDuyetKeHoachNLLSBase from "src/pages/LuuTruLichSu/TheoDoiKeHoachNopLuuLichSu";
import { Input, Spin, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {THEO_DOI_KE_HOACH_NOP_LUU_LICH_SU_HO_SO} from "src/storage/Storage";
import FileAPIService from "src/service/api/FileAPIService";
import { OpenFile } from "src/actions/formFile";
import File from "src/components/Form/File/File";
import {ModalRejectNopLuuLichSuFile} from "src/pages/Modals";
import {notifySuccess} from "src/custom/Function";
import DocCategory from "src/components/Form/Document/DocCategory";

const Search = Input.Search


const SearchBar = () => {
    return (
        <div className="mx-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px] max-w-[25%]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>
        </div>
    )
}


const TheoDoiKeHoachNopLuuLichSuHoSo = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const params = useParams();
    const dispatch = useDispatch();

    const handleClickFile = (fileId) => {
        dispatch(OpenFile(fileId));
    }

    const handleApprove = async (id) => {
        await FileAPIService.updateState([{
            id,
            current_state: 5,
            new_state: 20,
        }])
        notifySuccess('Chấp nhận hồ sơ thành công')
        setTimeout(() => {
            fetchFieldData()
        }, 300)
    }

    const handleReject = (id) => {
        dispatch({
            type: "open_modalRejectNopLuuLichSuFile",
            id: id,
            reFetchData: fetchFieldData,
        })
    }

    const handleClickDocument = (id) => {
        dispatch({
            type: "open",
            id:id,
        })
    }

    const fetchFieldData = async () => {
        setIsLoading(true)
        const files = await FileAPIService.getFileOfNLLSPlanByOrganId(params.plan_id, params.organ_id);
        const newData = []
        for (const file of files) {
            let state = 'Chưa duyệt'
            if(file.state === 20) {
                state = 'Đã chấp nhận'
            }
            newData.push({
                "id": file.id,
                "gov_file_code": <p className="cursor-pointer" onClick={() => handleClickFile(file.id)}>{file.gov_file_code}</p>,
                "title": <p className="cursor-pointer" onClick={() => handleClickFile(file.id)}>{file.title}</p>,
                "document": <Button onClick={() => handleClickDocument(file.id)}>Xem văn bản</Button>,
                "state":<button> {state}</button>,
                "action":  file.state === 5 && <div>
                    <Button
                        onClick={() => handleApprove(file.id)}
                        className="border-none shadow-none text-green-500 text-[20px] fa-regular fa-square-check"></Button>
                    <Button
                        onClick={() => handleReject(file.id)}
                        className="border-none shadow-none text-red-500 text-[20px] fa-regular fa-circle-xmark"></Button>
                </div>,
            })
        }
        setFieldData(newData)
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchFieldData()
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <Spin spinning={isLoading}>
            <PheDuyetKeHoachNLLSBase
                title={
                    <span>
                        <span >Theo dõi Kế Hoạch Nộp Lưu Lịch Sử</span> /
                        <span className="text-black"> Cơ quan </span> /
                        <span className="text-black"> Hồ sơ </span>
                    </span>
                }
                breadcrumb={
                    <span>
                        <Link to={`/luu-tru-lich-su/theo-doi-ke-hoach-nop-luu-lich-su`}> Theo dõi Kế Hoạch Nộp Lưu Lịch Sử </Link> /
                        <Link to={`/luu-tru-lich-su/theo-doi-ke-hoach-nop-luu-lich-su/${params.plan_id}`}> Cơ quan </Link>
                    </span>
                }
                fieldNames={THEO_DOI_KE_HOACH_NOP_LUU_LICH_SU_HO_SO}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                isLoading={isLoading}
            />
            <File />
            <ModalRejectNopLuuLichSuFile/>
            <DocCategory/>
        </Spin>
    )
}

export default TheoDoiKeHoachNopLuuLichSuHoSo

