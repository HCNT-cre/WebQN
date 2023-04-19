import { useEffect, useState } from "react";
import DanhMucKhoLuuTru from ".";
import axios from "axios";
import { WARE_HOUSE } from "../../../storage/StorageStorage";
import { Input, Select, Modal } from "antd";
const API_STORAGE_GET_WAREHOUSE_ALL = process.env.REACT_APP_API_STORAGE_GET_WAREHOUSE_ALL
const API_STORAGE_GET_ORGAN_ALL = process.env.REACT_APP_API_STORAGE_GET_ORGAN_ALL

const Search = Input.Search

const ModalC = ({ modalOpen, setModalOpen, optionOrgan, reFetchData }) => {
    const [request, setRequest] = useState({
        name: '',
        organ: '',
        state: false
    })


    const handleChangeRequest = (name, value) => {
        return setRequest({
            ...request,
            [name]: value
        })
    }

    const handleOk = async () => {
        await axios.post(API_STORAGE_GET_WAREHOUSE_ALL, request)
        setModalOpen(false)
        reFetchData()
    }

    return (
        <Modal
            title="Tạo kho mới"
            style={{
                top: 20,
            }}
            open={modalOpen}
            onOk={handleOk}
            onCancel={() => setModalOpen(false)}
        >
            <div>
                <div className="flex justify-between py-[12px]">
                    <span>Tên</span>
                    <Input name="name" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Cơ quan</span>
                    <Select
                        name="organ"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn cơ quan"
                        optionFilterProp="children"
                        onChange={(value) => handleChangeRequest('organ', value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionOrgan}
                    />
                </div>
            </div>
        </Modal>
    )
}

const SearchBar = ({ optionOrgan }) => {
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
                    options={optionOrgan}
                />
            </div>

        </div>

    )
}

const Action = () => {
    const [modalOpen, setModalOpen] = useState(false)
    useEffect(() => { 
        
    }, [modalOpen])

    const handleClick = () => {
        setModalOpen(true)
    }
    const handleOk = () => {
        setModalOpen(false)
    }

    const handleCancle = () => {
        setModalOpen(false)
    }

    return (
        <div>
            <button onClick={handleClick}>Sửa</button>
            <Modal open={modalOpen}
                title="Sửa Kho"
                onOk={handleOk}
                onCancel={handleCancle}>
                <div>
                    hello mn
                </div>
            </Modal>
        </div>
    )
}

const WareHouse = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [wareHouse, setWareHouse] = useState([])
    const [optionOrgan, setOptionOrgan] = useState([])

    const reFetchData = () => {
        const fetchWarehouse = async () => {
            setIsLoading(true)
            const response = await axios.get(API_STORAGE_GET_WAREHOUSE_ALL)
            const rawDatas = response.data
            let filesArray = []
            for (const rawData of rawDatas) {
                const row = {
                    'id': rawData.id,
                    'name': rawData.name,
                    'organ': rawData.organ,
                    'state': <button>{
                        rawData['state'] === true ? "Mở" : "Đóng"
                    }</button>,
                    'action': <Action />
                }
                filesArray.push(row)
            }
            setWareHouse(filesArray)
            setIsLoading(false)

        }

        const fetchOrgan = async () => {
            setIsLoading(true)

            const response = await axios.get(API_STORAGE_GET_ORGAN_ALL)
            const raws = []

            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionOrgan(raws)
            setIsLoading(false)

        }
        fetchWarehouse()
        fetchOrgan()
    }

    useEffect(() => {
        reFetchData()
    }, [])

    return (
        <DanhMucKhoLuuTru title="Kho" fieldNames={WARE_HOUSE} fieldDatas={wareHouse} isLoading={isLoading} SearchBar={<SearchBar optionOrgan={optionOrgan} />} ModalC={<ModalC optionOrgan={optionOrgan} reFetchData={reFetchData} />} />
    )
}

export default WareHouse