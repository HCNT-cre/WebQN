/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucHoSoBase from ".";
import { Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { DANH_MUC_HO_SO } from "src/storage/Storage";
import File from "src/components/Form/File/File";
import CategoryAPIService from "src/service/api/categoryAPIService";
import { Link } from "react-router-dom";
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

const DanhMucHoSo = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const fetchFieldData = async () => {
        setIsLoading(true)
        const years = await CategoryAPIService.getCategoryFileYears()
        const newData = []
        for (const year of years) {
            newData.push({
                "id": year,
                "year": <Link to={`./${year}`} className="cursor-pointer">{year}</Link>,
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
            <DanhMucHoSoBase
                title={
                    <span>
                        <span >Danh mục hồ sơ</span>
                    </span>
                }
                breadcrumb={
                    <span>
                        <Link to="/khai-bao-danh-muc/danh-muc-ho-so">Danh mục hồ sơ</Link>
                    </span>
                }
                fieldNames={DANH_MUC_HO_SO}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                isLoading={isLoading}
                reFetchData={fetchFieldData}
            />
            <File />
        </Spin>
    )
}

export default DanhMucHoSo

