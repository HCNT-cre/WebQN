/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DanhMucKhoLuuTru from ".";
import axios from "axios";
import { WARE_HOUSE } from "../../../storage/StorageStorage";
import { Input, Select, Modal, Button, Popconfirm } from "antd";


const API_STORAGE_GET_WAREHOUSE_ALL = process.env.REACT_APP_API_STORAGE_GET_WAREHOUSE_ALL
const API_STORAGE_GET_ORGAN_ALL = process.env.REACT_APP_API_STORAGE_GET_ORGAN_ALL
const API_STORAGE_DELETE_WAREHOUSE = process.env.REACT_APP_API_STORAGE_DELETE_WAREHOUSE
const API_STORAGE_PUT_WAREHOUSE = process.env.REACT_APP_API_STORAGE_PUT_WAREHOUSE

const Search = Input.Search


const Create = ({ modalOpen, setModalOpen, optionOrgan, reFetchData }) => {
    const [request, setRequest] = useState({
        name: null,
        organ: null,
        organId: null,
        state: true
    })


    const handleChangeRequest = (name, value) => {
        console.log(name, value)
        return setRequest((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    console.log(request)
    const handleOk = async () => {
        await axios.post(API_STORAGE_GET_WAREHOUSE_ALL, request)
        setModalOpen(false)
        reFetchData()
    }

    const handleCancle = () => {
        setModalOpen(false)
    }

    return (
        <Modal
            title="Tạo kho mới"
            style={{
                top: 20,
            }}
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancle}
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
                        onChange={(value, ev) => {
                            handleChangeRequest('organ', ev.label)
                            handleChangeRequest('organId', value)
                        }}
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
        <div className="mx-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px] max-w-[20%]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>

            <div className="bg-white p-[12px] w-[300px] max-w-[20%] ml-[20px]">
                <p className="mb-[12px]">Cơ quan</p>
                <div>
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
                    ></Select>
                </div>
            </div>
        </div>
    )
}

const Update = ({ reFetchData, id }) => {
    const [request, setRequest] = useState({
        name: null,
    })
    const [modalOpen, setModalOpen] = useState(false)

    const handleChangeRequest = (name, value) => {
        return setRequest({
            ...request,
            [name]: value
        })
    }

    const handleClick = () => {
        setModalOpen(true)
    }
    const handleOk = async () => {
        if (request.name !== null)
            await axios.put(API_STORAGE_PUT_WAREHOUSE + id, request)
        setModalOpen(false)
        reFetchData()
    }

    const handleCancle = () => {
        setModalOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClick} className='border-none'>
                <i className="fa-regular fa-pen-to-square"></i>
            </Button>
            <Modal open={modalOpen}
                title="Sửa tên kho"
                onOk={handleOk}
                onCancel={handleCancle}>
                <div className='flex justify-between items-center' >
                    <span>Tên</span>
                    <Input onChange={(e) => handleChangeRequest('name', e.target.value)} className='w-[70%]' />
                </div>
            </Modal>
        </div>
    )
}

const Delete = ({ id, reFetchData }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        const deleteWarehouse = async () => {
            const res = await axios.delete(API_STORAGE_DELETE_WAREHOUSE + id)
            console.log(res)
        }

        deleteWarehouse()
        setTimeout(async () => {
            await reFetchData()
        }, 500)

        setOpen(false)
    }

    useEffect(() => {
        const popupContainer = document.querySelectorAll(".ant-popover.ant-popconfirm.css-dev-only-do-not-override-1fviqcj.css-dev-only-do-not-override-1fviqcj.ant-popover-placement-top")[0]

        if (popupContainer === undefined)
            return

        const buttonAccepts = document.querySelectorAll(".ant-popconfirm-buttons > .ant-btn-primary")
        buttonAccepts.forEach((buttonCancel) => {
            buttonCancel.textContent = "Xóa"
        })

        const buttonCancels = document.querySelectorAll(".ant-popconfirm-buttons > .ant-btn-default ")
        buttonCancels.forEach((buttonAccept) => {
            buttonAccept.textContent = "Hủy"
        })
    }, [open])

    return (
        <Popconfirm title="Xóa kho"
            open={open}
            description="Bạn có chắc chắn xóa?"
            onConfirm={handleConfirm}
            onCancel={handleClose}
        >
            <Button className='border-none' onClick={() => { setOpen(true) }} title="Xóa">
                <i className="fa-solid fa-trash-can"></i>
            </Button>
        </Popconfirm>
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
                    'update': <Update id={rawData.id} reFetchData={reFetchData} />,
                    'delete': <Delete id={rawData.id} reFetchData={reFetchData} />
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
                raw["value"] = data["id"]
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
        <DanhMucKhoLuuTru title="Kho" fieldNames={WARE_HOUSE} fieldDatas={wareHouse} isLoading={isLoading} SearchBar={<SearchBar optionOrgan={optionOrgan} />} Create={<Create optionOrgan={optionOrgan} reFetchData={reFetchData} />} />
    )
}

export default WareHouse