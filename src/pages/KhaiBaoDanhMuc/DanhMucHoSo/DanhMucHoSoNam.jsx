/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucHoSoBase from ".";
import { Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OrganAPIService from "src/service/api/organAPIService";
import { DANH_MUC_HO_SO_BY_NAM } from "src/storage/Storage";
const Search = Input.Search


const SearchBar = () => {
    return (
        <div className="mx-[24px] mt-[8px]">
            <div className="bg-white p-[12px] w-[400px] flex">
                <p className="mb-[12px] w-[100px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>
        </div>
    )
}

const DanhMucHoSoNam = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const params = useParams();

    const reFetchData = async () => {
        setIsLoading(true)
        const organs = await OrganAPIService.getOrganByCategoryFileYear(params.year);
        const newData = []
        for (const organ of organs) {
            newData.push({
                "id": organ.id,
                "name": <Link to={`./${organ.id}`} className="cursor-pointer">{organ.name}</Link>,
                "organ_code":organ.code,
                "total": organ.total,
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
            <DanhMucHoSoBase
                title={
                    <span>
                        <span>Danh mục hồ sơ</span> /
                        <span className="text-black"> Năm </span>
                    </span>
                }
                breadcrumb={
                    <span>
                        <Link to="/khai-bao-danh-muc/danh-muc-ho-so">Danh mục hồ sơ</Link>
                    </span>
                 }
                fieldNames={DANH_MUC_HO_SO_BY_NAM}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                isLoading={isLoading}
                reFetchData={reFetchData}
            />
        </Spin>
    )
}

export default DanhMucHoSoNam
