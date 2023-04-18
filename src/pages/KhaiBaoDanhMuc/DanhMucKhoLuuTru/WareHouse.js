import { useEffect, useState } from "react";
import DanhMucKhoLuuTru from ".";
import axios from "axios";
import { WARE_HOUSE } from "../../../storage/StorageStorage";
import { Input, Select } from "antd";
const API_STORAGE_GET_WAREHOUSE_ALL = process.env.REACT_APP_API_STORAGE_GET_WAREHOUSE_ALL
const Search = Input.Search

const SearchBar = () => {
    return (
        <div className="ml-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>

            <div className="bg-white p-[12px] w-[300px] ml-[20px]">
            <p className="mb-[12px]">Cơ quan</p>

                <Select
                    name="state"
                    className="w-full bg-white outline-none rounded-md"
                    showSearch
                    allowClear
                    placeholder="Chọn cơ quan"
                    optionFilterProp="children"
                    onChange={(value) => console.log(value)}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        { value: 0, label: "Tất cả" },
                        {
                            value: 1,
                            label: 'Mở',
                        },
                        {
                            value: 2,
                            label: 'Đóng',
                        },
                        {
                            value: 3,
                            label: 'Nộp lưu cơ quan',
                        },
                        {
                            value: 4,
                            label: 'Lưu trữ cơ quan',
                        },
                        {
                            value: 5,
                            label: 'Nộp lưu lịch sử',
                        },
                        {
                            value: 6,
                            label: 'Lưu trữ lịch sử',
                        },
                    ]}
                />
            </div>

        </div>

    )
}

const WareHouse = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [wareHouse, setWareHouse] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await axios.get(API_STORAGE_GET_WAREHOUSE_ALL)

            const rawDatas = response.data
            console.log("response:", response)
            console.log(rawDatas);
            let filesArray = []
            for (const rawData of rawDatas) {
                const row = {
                    'id': rawData.id,
                    'name': rawData.name,
                    'organ': rawData.organ,
                    'state': <button>{
                        rawData['state'] === true ? "Mở" : "Đóng"
                    }</button>,
                }
                filesArray.push(row)
            }
            setWareHouse(filesArray)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    console.log(wareHouse)

    return (
        <DanhMucKhoLuuTru title="Kho" fieldNames={WARE_HOUSE} fieldDatas={wareHouse} isLoading={isLoading} SearchBar={SearchBar} />

    )
}

export default WareHouse