/* eslint-disable react-hooks/exhaustive-deps */
import PheDuyetKeHoachNLLSBase from "src/pages/LuuTruLichSu/PheDuyetKeHoachLuuTruLichSu";
import { Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LuutrucoquanAPIService from "src/service/api/LuutrucoquanAPIService";
import { ORGAN_PLAN_NLLS } from "src/storage/StorageOffice";

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


const PheDuyetKeHoachNopLuuLichSuCoQuan = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const params = useParams();

    const fetchFieldData = async () => {
        setIsLoading(true)
        const organs = await LuutrucoquanAPIService.getOrganByPlanId(params.plan_id);
        const newData = []
        for (const organ of organs) {
            newData.push({
                "id": organ.id,
                "name": <Link to={`./${organ.id}`} className="cursor-pointer">{organ.name}</Link>,
                "state": <button>Chưa nộp</button>
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
                        <span >Phê Duyệt Kế Hoạch Nộp Lưu Lịch Sử</span> /
                        <span className="text-black"> Cơ quan </span>
                    </span>
                }
                breadcrumb={
                    <span>
                        <Link to="/luu-tru-lich-su/phe-duyet-ke-hoach-nop-luu-lich-su">Danh mục cơ quan</Link> /
                        <Link to={`/luu-tru-lich-su/phe-duyet-ke-hoach-nop-luu-lich-su/${params.plan_id}`}> Phòng ban </Link>
                    </span>
                }
                fieldNames={ORGAN_PLAN_NLLS}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                isLoading={isLoading}
            />
        </Spin>
    )
}

export default PheDuyetKeHoachNopLuuLichSuCoQuan