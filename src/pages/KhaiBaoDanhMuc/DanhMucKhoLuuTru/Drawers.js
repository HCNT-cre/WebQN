/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DanhMucKhoLuuTru from ".";
import axios from "axios";
import { DRAWERS } from "../../../storage/StorageStorage";
import { Input, Select, Modal, Button, Popconfirm } from "antd";

const API_STORAGE_DELETE_DRAWERS = process.env.REACT_APP_API_STORAGE_DELETE_DRAWERS
const API_STORAGE_PUT_DRAWERS = process.env.REACT_APP_API_STORAGE_PUT_DRAWERS
const API_STORAGE_GET_DRAWERS_ALL = process.env.REACT_APP_API_STORAGE_GET_DRAWERS_ALL

const API_STORAGE_GET_SHELF_ALL = process.env.REACT_APP_API_STORAGE_GET_SHELF_ALL
const API_STORAGE_GET_ORGAN_ALL = process.env.REACT_APP_API_STORAGE_GET_ORGAN_ALL
const API_STORAGE_GET_WAREHOUSEROOM_ALL = process.env.REACT_APP_API_STORAGE_GET_WAREHOUSEROOM_ALL
const API_STORAGE_GET_WAREHOUSE_ALL = process.env.REACT_APP_API_STORAGE_GET_WAREHOUSE_ALL


const Search = Input.Search


const Create = ({ modalOpen, setModalOpen, optionOrgan, reFetchData, optionWarehouse, optionWarehouseRoom, optionShelf }) => {
    const [request, setRequest] = useState({
        name: null,
        organ: null,
        warehouse: null,
        warehouseroom: null,
        shelf: null,
        state: false
    })


    const handleChangeRequest = (name, value) => {
        return setRequest({
            ...request,
            [name]: value
        })
    }

    const handleOk = async () => {
        await axios.post(API_STORAGE_GET_SHELF_ALL, request)
        setModalOpen(false)
        reFetchData()

    }

    const handleCancle = () => {
        setModalOpen(false)
    }

    return (
        <Modal
            title="Tạo hộp mới"
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
                        onChange={(value) => handleChangeRequest('organ', value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionOrgan}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Kho</span>
                    <Select
                        name="warehouse"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn kho"
                        optionFilterProp="children"
                        onChange={(value) => handleChangeRequest('warehouse', value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouse}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Phòng kho</span>
                    <Select
                        name="warehouseroom"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn phòng kho"
                        optionFilterProp="children"
                        onChange={(value) => handleChangeRequest('warehouseroom', value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouseRoom}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Kệ</span>
                    <Select
                        name="warehouseroom"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn phòng kho"
                        optionFilterProp="children"
                        onChange={(value) => handleChangeRequest('shelf', value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionShelf}
                    />
                </div>
            </div>
        </Modal>
    )
}

const SearchBar = ({ optionOrgan, optionWarehouse, optionWarehouseRoom, optionShelf }) => {
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

            <div className="bg-white p-[12px] w-[300px] max-w-[20%] ml-[20px]">
                <p className="mb-[12px]">Kho</p>
                <div>
                    <Select
                        name="state"
                        className="w-full bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn kho"
                        optionFilterProp="children"
                        onChange={(value) => console.log(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouse}
                    ></Select>
                </div>
            </div>

            <div className="bg-white p-[12px] w-[300px] max-w-[20%] ml-[20px]">
                <p className="mb-[12px]">Phòng kho</p>
                <div>
                    <Select
                        name="state"
                        className="w-full bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn kho"
                        optionFilterProp="children"
                        onChange={(value) => console.log(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouseRoom}
                    ></Select>
                </div>
            </div>
            <div className="bg-white p-[12px] w-[300px] max-w-[20%] ml-[20px]">
                <p className="mb-[12px]">Kệ</p>
                <div>
                    <Select
                        name="state"
                        className="w-full bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn kệ"
                        optionFilterProp="children"
                        onChange={(value) => console.log(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionShelf}
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
            await axios.put(API_STORAGE_PUT_DRAWERS + id, request)
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
                title="Sửa tên hộp"
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
            const res = await axios.delete(API_STORAGE_DELETE_DRAWERS + id)
            console.log(res)
        }

        deleteWarehouse()
        setTimeout(async () => {
            await reFetchData()
        }, 500)

        setOpen(false)
    }

    useEffect(() => {
        const popupContainer = document.querySelectorAll(".ant-popover.ant-popconfirm.css-dev-only-do-not-override-1vtf12y.css-dev-only-do-not-override-1vtf12y.ant-popover-placement-top")[0]

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
        <Popconfirm title="Xóa hộp"
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

const Drawers = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [drawers, setDrawers] = useState([])
    const [optionShelf, setOptionShelf] = useState([])
    const [optionOrgan, setOptionOrgan] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [optionWarehouseRoom, setOptionWarehouseRoom] = useState([])

    const reFetchData = () => {
        const fetchDrawers = async () => {
            setIsLoading(true)
            const response = await axios.get(API_STORAGE_GET_DRAWERS_ALL)
            const rawDatas = response.data
            let filesArray = []
            for (const rawData of rawDatas) {
                const row = {
                    'id': rawData.id,
                    'name': rawData.name,
                    'organ': rawData.organ,
                    'warehouse': rawData.warehouse,
                    'warehouseroom': rawData.warehouseroom,
                    'shelf': rawData.shelf,
                    'state': <button>{
                        rawData['state'] === true ? "Mở" : "Đóng"
                    }</button>,
                    'update': <Update id={rawData.id} reFetchData={reFetchData} />,
                    'delete': <Delete id={rawData.id} reFetchData={reFetchData} />
                }
                filesArray.push(row)
            }

            setDrawers(filesArray)
            setIsLoading(false)
        }

        const fetchShelf = async () => {
            setIsLoading(true)

            const response = await axios.get(API_STORAGE_GET_SHELF_ALL)
            const raws = []

            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionShelf(raws)
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

        const fetchWarehouse = async () => {
            setIsLoading(true)
            const response = await axios.get(API_STORAGE_GET_WAREHOUSE_ALL)
            console.log("response", response)
            const raws = []
            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionWarehouse(raws)
            setIsLoading(false)
        }

        const fetchWareHouseRoom = async () => {
            setIsLoading(true)
            const response = await axios.get(API_STORAGE_GET_WAREHOUSEROOM_ALL)
            console.log("response", response)
            const raws = []
            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionWarehouseRoom(raws)
            setIsLoading(false)
        }

        fetchDrawers()
        fetchShelf()
        fetchWareHouseRoom()
        fetchOrgan()
        fetchWarehouse()
    }

    useEffect(() => {
        reFetchData()
    }, [])

    return (
        <DanhMucKhoLuuTru title="Hộp" fieldNames={DRAWERS} fieldDatas={drawers} isLoading={isLoading} SearchBar={<SearchBar optionOrgan={optionOrgan} optionWarehouse={optionWarehouse} optionWarehouseRoom={optionWarehouseRoom} optionShelf={optionShelf} />}
            Create={<Create optionOrgan={optionOrgan} reFetchData={reFetchData} optionWarehouse={optionWarehouse} optionWarehouseRoom={optionWarehouseRoom} optionShelf={optionShelf} />} />
    )
}

export default Drawers