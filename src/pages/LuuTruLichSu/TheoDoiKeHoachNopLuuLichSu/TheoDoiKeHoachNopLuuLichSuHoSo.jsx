/* eslint-disable react-hooks/exhaustive-deps */
import PheDuyetKeHoachNLLSBase from "src/pages/LuuTruLichSu/TheoDoiKeHoachNopLuuLichSu";
import { Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FILE_PLAN_NLLS } from "src/storage/StorageOffice";
import FileAPIService from "src/service/api/FileAPIService";

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


const TheoDoiKeHoachNopLuuLichSuHoSo
 = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const params = useParams();

    const fetchFieldData = async () => {
        setIsLoading(true)
        const files = await FileAPIService.getFileOfNLLSPlanByOrganId(params.plan_id, params.organ_id);
        const newData = []
        for (const file of files) {
            newData.push({
                "id": file.id,
                "name": file.title,
                "state": <button> Chưa có </button>,
                "action": "Chưa có"
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
                fieldNames={FILE_PLAN_NLLS}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                isLoading={isLoading}
            />
        </Spin>
    )
}

export default TheoDoiKeHoachNopLuuLichSuHoSo

