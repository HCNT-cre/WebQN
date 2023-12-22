/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DanhMucKhoLuuTru from ".";
import axiosHttpService from "src/utils/httpService";
import { DRAWERS } from "../../../storage/StorageStorage";
import { Input, Select, Modal, Button, Popconfirm } from "antd";
import KhaiBaoDanhMucAPIService from "src/service/api/KhaiBaoDanhMucAPIService";

const API_STORAGE_DELETE_DRAWERS = import.meta.env.VITE_API_STORAGE_DELETE_DRAWERS
const API_STORAGE_GET_DRAWERS_ALL = import.meta.env.VITE_API_STORAGE_GET_DRAWERS_ALL
const API_STORAGE_POST_DRAWERS = import.meta.env.VITE_API_STORAGE_POST_DRAWERS

const API_STORAGE_GET_SHELF_ALL = import.meta.env.VITE_API_STORAGE_GET_SHELF_ALL
const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL
const API_STORAGE_GET_WAREHOUSEROOM_ALL = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSEROOM_ALL
const API_STORAGE_GET_WAREHOUSE_ALL = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSE_ALL


const Search = Input.Search


const Create = ({ modalOpen, setModalOpen, optionOrgan, reFetchData }) => {
    const [request, setRequest] = useState({
        name: null,
        organ: null,
        warehouse: null,
        warehouse_room: null,
        shelf: null,
        state: true
    })

    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [optionWarehouseroom, setOptionWarehouseroom] = useState([])
    const [optionShelf, setOptionShelf] = useState([])
    const [warehouse, setWareHouse] = useState(null)
    const [warehouseroom, setWareHouseRoom] = useState(null)
    const [shelf, setShelf] = useState(null)

    const handleChangeRequest = (name, value) => {
        return setRequest((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleOk = async () => {
        await axiosHttpService.post(API_STORAGE_POST_DRAWERS, request)
        setModalOpen(false)
        reFetchData()

    }

    const handleCancel = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        const getWarehouse = async () => {
            if (request.organ === null) return
            const data = await KhaiBaoDanhMucAPIService.getWarehouseByOrganId(request.organ)
            const raws = []
            for (const warehouse of data) {
                const raw = {}
                raw["value"] = warehouse["id"]
                raw["label"] = warehouse["name"]
                raws.push(raw)
            }
            setOptionWarehouse(raws)
        }
        getWarehouse()
        setOptionWarehouseroom([])
        setOptionShelf([])
        setWareHouse(null)
    }, [request['organ']])

    useEffect(() => {
        const getWarehouseRoom = async () => {
            if (request.warehouse === null) return
            const data = await KhaiBaoDanhMucAPIService.getWarehouseRoomByWarehouseId(request.warehouse)
            const raws = []
            for (const warehouseRoom of data) {
                const raw = {}
                raw["value"] = warehouseRoom["id"]
                raw["label"] = warehouseRoom["name"]
                raws.push(raw)
            }
            setOptionWarehouseroom(raws)
        }
        getWarehouseRoom()
        setOptionShelf([])
        setWareHouseRoom(null)
    }, [request['warehouse']])

    useEffect(() => {
        const getShelf = async () => {
            if (request.warehouse_room === null) return
            const data = await KhaiBaoDanhMucAPIService.getShelfByWarehouseRoomId(request.warehouse_room)
            const raws = []
            for (const shelf of data) {
                const raw = {}
                raw["value"] = shelf["id"]
                raw["label"] = shelf["name"]
                raws.push(raw)
            }
            setOptionShelf(raws)
        }
        getShelf()
        setShelf(null)
    }, [request['warehouse_room']])

    return (
        <Modal
            title="Tạo hộp mới"
            style={{
                top: 20,
            }}
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
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
                            handleChangeRequest('organ', value)
                        }}
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
                        onChange={(value, ev) => {
                            handleChangeRequest('warehouse', value)
                            setWareHouse(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        value={warehouse}
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
                        onChange={(value, ev) => {
                            handleChangeRequest('warehouse_room', value)
                            setWareHouseRoom(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        value={warehouseroom}
                        options={optionWarehouseroom}
                    />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Kệ</span>
                    <Select
                        name="warehouseroom"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn kệ"
                        optionFilterProp="children"
                        onChange={(value, ev) => {
                            handleChangeRequest('shelf', value)
                            setShelf(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        value={shelf}
                        options={optionShelf}
                    />
                </div>

            </div>
        </Modal>
    )
}

const SearchBar = ({ optionOrgan, allWarehouse, allWarehouseRoom, allShelf }) => {

    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [optionWarehouseroom, setOptionWarehouseroom] = useState([])
    const [optionShelf, setOptionShelf] = useState([])

    const handleChangeOptionWarehouseroom = (value) => {

        const optionShelf = []
        for (const shelf of allShelf) {
            if (shelf.par === value)
                optionShelf.push({
                    value: shelf.value,
                    label: shelf.label
                })
        }
        setOptionShelf(optionShelf)
    }

    const handleChangeOptionWarehouse = (value) => {
        const optionWarehouseroom = []
        for (const warehouseroom of allWarehouseRoom) {
            if (warehouseroom.par === value) {
                optionWarehouseroom.push({
                    value: warehouseroom.value,
                    label: warehouseroom.label
                })
            }
        }
        setOptionWarehouseroom(optionWarehouseroom)
        handleChangeOptionWarehouseroom(-1)

    }

    const handleChangeOptionOrgan = (value) => {
        const optionWarehouse = []
        for (const warehouse of allWarehouse) {
            if (warehouse.par === value)
                optionWarehouse.push({
                    value: warehouse.value,
                    label: warehouse.label
                })
        }
        setOptionWarehouse(optionWarehouse)
        handleChangeOptionWarehouse(-1)
    }



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
                        onChange={(value) => handleChangeOptionOrgan(value)}
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
                        onChange={(value) => handleChangeOptionWarehouse(value)}
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
                        onChange={(value) => handleChangeOptionWarehouseroom(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouseroom}
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
            await KhaiBaoDanhMucAPIService.updateDrawerById(id, request)
        setModalOpen(false)
        reFetchData()
    }

    const handleCancel = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        const getDrawers = async () => {
            if (!id) return;
            const res = await KhaiBaoDanhMucAPIService.getDrawerById(id);
            setRequest(res)
        }
        getDrawers()
    }, [id])

    return (
        <div>
            <Button onClick={handleClick} className='border-none'>
                <i className="fa-regular fa-pen-to-square"></i>
            </Button>
            <Modal open={modalOpen}
                title="Sửa tên hộp"
                onOk={handleOk}
                onCancel={handleCancel}>
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
            await KhaiBaoDanhMucAPIService.deleteDrawerById(id)
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
            const response = await axiosHttpService.get(API_STORAGE_GET_DRAWERS_ALL)
            const rawDatas = response.data
            let filesArray = []
            for (const rawData of rawDatas) {
                const shelf = await KhaiBaoDanhMucAPIService.getShelfById(rawData.shelf)
                const warehouseRoom = await KhaiBaoDanhMucAPIService.getWarehouseRoomById(shelf.warehouse_room);
                const wareHouse = await KhaiBaoDanhMucAPIService.getWarehouseById(warehouseRoom.warehouse);
                const organ = await KhaiBaoDanhMucAPIService.getOrganById(wareHouse.organ);
                const row = {
                    'id': rawData.id,
                    'name': rawData.name,
                    'organ': organ.name,
                    'warehouse': wareHouse.name,
                    'warehouseroom': warehouseRoom.name,
                    'shelf': shelf.name,
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
            const response = await axiosHttpService.get(API_STORAGE_GET_SHELF_ALL)
            const raws = []

            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["id"]
                raw["label"] = data["name"]
                raw["par"] = data["warehouseroomId"]
                raws.push(raw)
            }

            setOptionShelf(raws)
        }

        const fetchOrgan = async () => {
            const response = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL)
            const raws = []

            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["id"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionOrgan(raws)
        }

        const fetchWarehouse = async () => {
            const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSE_ALL)
            const raws = []
            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["id"]
                raw["label"] = data["name"]
                raw["par"] = data["organId"]
                raws.push(raw)
            }

            setOptionWarehouse(raws)
        }

        const fetchWareHouseRoom = async () => {
            const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSEROOM_ALL)
            const raws = []
            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["id"]
                raw["label"] = data["name"]
                raw["par"] = data["warehouseId"]
                raws.push(raw)
            }

            setOptionWarehouseRoom(raws)
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
        <DanhMucKhoLuuTru title="Hộp" fieldNames={DRAWERS} fieldDatas={drawers} isLoading={isLoading} SearchBar={<SearchBar optionOrgan={optionOrgan} allWarehouse={optionWarehouse} allWarehouseRoom={optionWarehouseRoom} allShelf={optionShelf} />}
            Create={<Create optionOrgan={optionOrgan} reFetchData={reFetchData} allWarehouse={optionWarehouse} allWarehouseRoom={optionWarehouseRoom} allShelf={optionShelf} />} />
    )
}

export default Drawers
