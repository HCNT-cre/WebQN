/* eslint-disable react-hooks/exhaustive-deps */
import PheDuyetKeHoachNLLSBase from "src/pages/LuuTruLichSu/TheoDoiKeHoachNopLuuLichSu";
import { Input, Spin, Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LuutrucoquanAPIService from "src/service/api/LuutrucoquanAPIService";
import { ORGAN_PLAN_NLLS } from "src/storage/StorageOffice";
import { ModalStateNLLSPlanOrgan } from "src/pages/Modals";
import { useDispatch } from "react-redux";
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


const TheoDoiKeHoachNopLuuLichSuCoQuan = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const params = useParams();
    const dispatch = useDispatch();

    const handleClickOrgan = (planId, organId) => {
        dispatch({ type: "open_modalStateNLLSPlanOrganReducer", planId, organId, reFetchData })
    }
    const reFetchData = async () => {
        setIsLoading(true)
        const organs = await LuutrucoquanAPIService.getOrganAndStateOfNLLSPlan(params.plan_id);
        const newData = []
        for (const organ of organs) {
            newData.push({
                "id": organ.id,
                "name": <Link to={`./${organ.id}`} className="cursor-pointer">{organ.name}</Link>,
                "state": <button>{organ.state}</button>,
                "action": <Button className="border-none shadow-none text-green-500" onClick={() => handleClickOrgan(organ.plan_id, organ.id)}>
                    <i className="text-[20px] fa-regular fa-square-check"></i>
                </Button>
            })
        }
        setFieldData(newData)
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await reFetchData()
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <Spin spinning={isLoading}>
            <PheDuyetKeHoachNLLSBase
                title={
                    <span>
                        <span>Theo Dõi Kế Hoạch Nộp Lưu Lịch Sử</span> /
                        <span className="text-black"> Cơ quan </span>
                    </span>
                }
                breadcrumb={
                    <span>
                        <Link to="/luu-tru-lich-su/theo-doi-ke-hoach-nop-luu-lich-su">Theo Dõi Kế Hoạch Nộp Lưu Lịch Sử</Link>
                    </span>
                }
                fieldNames={ORGAN_PLAN_NLLS}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                isLoading={isLoading}
            />
            <ModalStateNLLSPlanOrgan />
        </Spin>
    )
}

export default TheoDoiKeHoachNopLuuLichSuCoQuan
