import { Modal, Checkbox, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpenFile } from "../actions/formFile";
import axios from "axios";
import { notifyError, notifySuccess } from "../custom/Function";


const API_GOV_FILE_UPDATE_STATE = process.env.REACT_APP_API_GOV_FILE_UPDATE_STATE

const CheckBoxx = ({ id, type, name, handleClickCheckBox, isChecked }) => {
    return (
        <Checkbox
            id={id}
            name={name}
            type={type}
            onChange={handleClickCheckBox}
            checked={isChecked}
            className="outline-none"
        />
    );
};

const API_STORAGE_GET_SHELF_ALL = process.env.REACT_APP_API_STORAGE_GET_SHELF_ALL
const API_STORAGE_GET_WAREHOUSEROOM_ALL = process.env.REACT_APP_API_STORAGE_GET_WAREHOUSEROOM_ALL
const API_STORAGE_GET_WAREHOUSE_ALL = process.env.REACT_APP_API_STORAGE_GET_WAREHOUSE_ALL
const API_STORAGE_GET_ORGAN_ALL = process.env.REACT_APP_API_STORAGE_GET_ORGAN_ALL
const API_STORAGE_GET_DRAWERS_ALL = process.env.REACT_APP_API_STORAGE_GET_DRAWERS_ALL

const API_STORAGE_POST_FILE_ORGAN_STORAGE = process.env.REACT_APP_API_STORAGE_POST_FILE_ORGAN_STORAGE

const ModalApprove = ({ open, setOpenModal, setParentModal }) => {
    const dispatch = useDispatch()
    const reFetchFile = useSelector(state => state.reFetchFile.fetchFileFunction)

    const [request, setRequest] = useState({
        organ: null,
        warehouse: null,
        warehouseroom: null,
        shelf: null,
    })
    const IDFile = useSelector(state => state.modalCensorship.id)
    const current_state = useSelector(state => state.modalCensorship.current_state)
    const [optionShelf, setOptionShelf] = useState([])
    const [optionOrgan, setOptionOrgan] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [optionWarehouseRoom, setOptionWarehouseRoom] = useState([])
    const [optionDrawers, setOptionDrawers] = useState([])

    const reFetchData = () => {

        const fetchShelf = async () => {

            const response = await axios.get(API_STORAGE_GET_SHELF_ALL)
            const raws = []

            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionShelf(raws)

        }

        const fetchOrgan = async () => {


            const response = await axios.get(API_STORAGE_GET_ORGAN_ALL)
            const raws = []

            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionOrgan(raws)

        }

        const fetchWarehouse = async () => {

            const response = await axios.get(API_STORAGE_GET_WAREHOUSE_ALL)
            const raws = []
            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionWarehouse(raws)

        }

        const fetchWareHouseRoom = async () => {

            const response = await axios.get(API_STORAGE_GET_WAREHOUSEROOM_ALL)
            const raws = []
            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionWarehouseRoom(raws)

        }
        const fetchDrawers = async () => {

            const response = await axios.get(API_STORAGE_GET_DRAWERS_ALL)
            const raws = []
            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["name"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionDrawers(raws)
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

    const handleChangeRequest = (name, value) => {
        return setRequest((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCancle = () => {
        setOpenModal(false)
    }

    const handleOk = () => {
        setOpenModal(false)
    }

    const handleClickApprove = async () => {
        for (const key in request) {
            if (request[key] === null) {
                notifyError("Vui lòng chọn đủ thông tin")
                return
            }
        }

        await axios.post(API_GOV_FILE_UPDATE_STATE, [{
            id: IDFile, current_state: current_state,
            new_state: current_state + 1
        }])
        await axios.post(API_STORAGE_POST_FILE_ORGAN_STORAGE, { ...request, file_id: IDFile })
        notifySuccess("Duyệt thành công")
        reFetchFile()
        setOpenModal(false)
        dispatch({ type: "close_modal", id: null })
    }

    return (
        <div>
            <Modal
                title="Duyệt hồ sơ vào kho"
                footer={null}
                style={{
                    top: 200,
                }}
                open={open}
                onOk={handleOk}
                onCancel={handleCancle}
            >
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
                <div className="flex justify-between py-[12px]">
                    <span>Hộp</span>
                    <Select
                        name="warehouseroom"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn phòng kho"
                        optionFilterProp="children"
                        onChange={(value) => handleChangeRequest('drawers', value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionDrawers}
                    />
                </div>
                <div className="flex justify-center">
                    <Button className="mx-[8px] bg-green-500 text-white font-medium disabled:opacity-40" onClick={handleClickApprove}>Duyệt</Button>
                </div>
            </Modal>
        </div>
    )
}


export const ModalCensorship = () => {
    const open = useSelector(state => state.modalCensorship.state)
    const IDFile = useSelector(state => state.modalCensorship.id)
    const current_state = useSelector(state => state.modalCensorship.current_state)
    const reFetchFile = useSelector(state => state.reFetchFile.fetchFileFunction)

    const dispatch = useDispatch();
    const [isCheck, setIsCheck] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [modalApprove, setModalApprove] = useState(false)

    useEffect(() => {
        setModalOpen(open)
    }, [open])

    const handleClickCheckBox = e => {
        const { id, checked } = e.target;
        if (checked) {
            setIsCheck([...isCheck, id]);
        } else {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    const handleOk = () => {
        setModalOpen(false)
    }

    const handleCancle = () => {
        dispatch({ type: "close_modal", id: null })
    }

    const handleClickViewFile = () => {
        if (IDFile === null || IDFile === undefined) return;
        dispatch(OpenFile("watch_file", IDFile))
    }

    const handleClickViewDocCategory = () => {
        if (IDFile === null || IDFile === undefined) return;
        dispatch({ type: "open", id: IDFile })
    }

    const handleClickApprove = () => {
        setModalApprove(true)
    }

    const handleClickReject = () => {
        axios.post(API_GOV_FILE_UPDATE_STATE, [
            { id: IDFile, current_state: current_state, new_state: current_state === 3 ? 7 : 8 }])
        notifySuccess("Đã trả về hồ sơ")
        dispatch({ type: "close_modal", id: null })

        if (reFetchFile !== null) {
            reFetchFile()
        }
    }

    return (
        <>
            <Modal
                footer={null}
                title="Duyệt hồ sơ"
                style={{
                    top: 200,
                }}
                open={modalOpen}
                onOk={handleOk}
                onCancel={handleCancle}
            >
                <div className="my-[12px]">
                    <div className="flex">
                        <CheckBoxx handleClickCheckBox={handleClickCheckBox} isChecked={isCheck.includes("cb1")} id="cb1" type="checkbox" />
                        <div className="ml-[12px]">
                            Đã thẩm định&nbsp;
                            <span onClick={handleClickViewFile} className="cursor-pointer underline font-bold">
                                thông tin hồ sơ
                            </span>
                        </div>
                    </div>
                </div>
                <div className="my-[12px]">
                    <div className="flex">
                        <CheckBoxx handleClickCheckBox={handleClickCheckBox} isChecked={isCheck.includes("cb2")} id="cb2" type="checkbox" />
                        <div className="ml-[12px]">
                            Đã thẩm định&nbsp;
                            <span onClick={handleClickViewDocCategory} className="cursor-pointer underline font-bold">
                                văn bản hồ sơ
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button disabled={isCheck.length < 2} className="mx-[8px] bg-green-500 text-white font-medium disabled:opacity-40" onClick={handleClickApprove}>Duyệt</Button>
                    <Button className="mx-[8px] bg-red-500 text-white font-medium" onClick={handleClickReject}>Từ chối</Button>
                </div>
            </Modal>

            <ModalApprove open={modalApprove} setOpenModal={setModalApprove} setParentModal={setModalOpen} />
        </>

    )
}