import { Modal, Checkbox, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpenFile } from "../actions/formFile";
import axiosHttpService from "src/utils/httpService";
import { notifyError, notifySuccess } from "../custom/Function";

const API_GOV_FILE_UPDATE_STATE = import.meta.env.VITE_API_GOV_FILE_UPDATE_STATE
const API_STORAGE_GET_SHELF_ALL = import.meta.env.VITE_API_STORAGE_GET_SHELF_ALL
const API_STORAGE_GET_WAREHOUSEROOM_ALL = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSEROOM_ALL
const API_STORAGE_GET_WAREHOUSE_ALL = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSE_ALL
const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL
const API_STORAGE_GET_DRAWERS_ALL = import.meta.env.VITE_API_STORAGE_GET_DRAWERS_ALL

const API_STORAGE_POST_FILE_ORGAN_STORAGE = import.meta.env.VITE_API_STORAGE_POST_FILE_ORGAN_STORAGE

const API_DOCUMENT_MODIFICATION_APPROVE = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_APPROVE

const API_DOCUMENT_MODIFICATION_REJECT = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_REJECT

const API_DOCUMENT_MODIFICATION_REJECT_ADDED = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_REJECT_ADDED
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


export const ModalCensorship = () => {
    const open = useSelector(state => state.modalCensorship.state)
    const IDFile = useSelector(state => state.modalCensorship.id)
    const current_state = useSelector(state => state.modalCensorship.current_state)
    const reFetchFile = useSelector(state => state.reFetchFile.fetchFileFunction)

    const dispatch = useDispatch();
    const [isCheck, setIsCheck] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)

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
        dispatch({ type: "close_modal_confirm_nopluucoquan", id: null })
    }

    const handleClickViewFile = () => {
        if (IDFile === null || IDFile === undefined) return;
        dispatch(OpenFile(IDFile))
    }

    const handleClickViewDocCategory = () => {
        if (IDFile === null || IDFile === undefined) return;
        dispatch({ type: "open", id: IDFile })
    }

    const handleClickApprove = async () => {
        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [{
            id: IDFile, current_state: current_state,
            new_state: current_state + 1
        }])
        notifySuccess("Duyệt thành công")
        reFetchFile()
        dispatch({ type: "close_modal_confirm_nopluucoquan", id: null })
    }

    const handleClickReject = () => {
        axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [
            { id: IDFile, current_state: current_state, new_state: current_state === 3 ? 7 : 8 }])
        notifySuccess("Đã trả về hồ sơ")
        dispatch({ type: "close_modal_confirm_nopluucoquan", id: null })

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


        </>

    )
}

export const ModalConfirmLuuTruCoQuan = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.modalStoreOrgan.state)
    const reFetchFile = useSelector(state => state.reFetchFile.fetchFileFunction)

    const [request, setRequest] = useState({
        organ: null,
        warehouse: null,
        warehouseroom: null,
        shelf: null,
    })

    const IDFile = useSelector(state => state.modalStoreOrgan.id)
    const [optionShelf, setOptionShelf] = useState([])
    const [optionOrgan, setOptionOrgan] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [optionWarehouseRoom, setOptionWarehouseRoom] = useState([])
    const [optionDrawers, setOptionDrawers] = useState([])

    const reFetchData = () => {

        const fetchShelf = async () => {

            const response = await axiosHttpService.get(API_STORAGE_GET_SHELF_ALL)
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


            const response = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL)
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

            const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSE_ALL)
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

            const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSEROOM_ALL)
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

            const response = await axiosHttpService.get(API_STORAGE_GET_DRAWERS_ALL)
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
        dispatch({ type: "close_modal_confirm_luutrucoquan", id: null })
    }

    const handleOk = () => {
        dispatch({ type: "close_modal_confirm_luutrucoquan", id: null })
    }

    const handleClickApprove = async () => {
        for (const key in request) {
            if (request[key] === null) {
                notifyError("Vui lòng chọn đủ thông tin")
                return
            }
        }

        await axiosHttpService.post(API_STORAGE_POST_FILE_ORGAN_STORAGE, { ...request, file_id: IDFile })
        dispatch({ type: "close_modal_confirm_luutrucoquan", id: null })
        notifySuccess("Duyệt thành công")
        reFetchFile()
    }

    return (
        <div>
            <Modal
                title="Duyệt hồ sơ vào kho"
                footer={null}
                style={{
                    top: 200,
                }}
                open={state}
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

export const ModalModificationDocumentConfirmStore = () => {
    const open = useSelector(state => state.modalModificationDocumentConfirmStore.state)
    const IDFile = useSelector(state => state.modalModificationDocumentConfirmStore.id)

    const dispatch = useDispatch();
    const [isCheck, setIsCheck] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)

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
        dispatch({ type: "close_modal_confirm_bmcl_pheduyetluukho", id: null })
    }

    const handleClickViewFile = () => {
        if (IDFile === null || IDFile === undefined) return;
        dispatch(OpenFile(IDFile))
    }

    const handleClickViewDocCategory = () => {
        if (IDFile === null || IDFile === undefined) return;
        dispatch({ type: "open", id: IDFile })
    }

    const handleClickApprove = async () => {
        await axiosHttpService.post(API_DOCUMENT_MODIFICATION_APPROVE, { idFile: IDFile })
        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [{
            id: IDFile, current_state: 3,
            new_state: 3 + 1
        }])
        notifySuccess("Duyệt thành công")
        dispatch({ type: "close_modal_confirm_bmcl_pheduyetluukho", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)

    }

    const handleClickReject = async () => {
        await axiosHttpService.post(API_DOCUMENT_MODIFICATION_REJECT, { idFile: IDFile })
        notifySuccess("Đã trả về hồ sơ")
        dispatch({ type: "close_modal_confirm_bmcl_pheduyetluukho", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)
    }

    return (
        <>
            <Modal
                footer={null}
                title="Duyệt hồ sơ"
                style={{
                    top: 200,
                }}
                open={open}
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


        </>

    )
}

export const ModalModificationDocumentAddDocument = () => {
    const open = useSelector(state => state.modalModificationDocumentAddDocument.state)
    const IDFile = useSelector(state => state.modalModificationDocumentAddDocument.id)

    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setModalOpen(open)
    }, [open])

    const handleOk = () => {
        setModalOpen(false)
    }

    const handleCancle = () => {
        dispatch({ type: "close_modal_confirm_bmcl_bosunghosotailieu", id: null })
    }

    const handleClickApprove = async () => {
        await axiosHttpService.post(API_DOCUMENT_MODIFICATION_REJECT_ADDED, { idFile: IDFile })

        const rejected = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT)
        const id = rejected.data.find(item => item.idFile === IDFile).id
        await axiosHttpService.delete(API_DOCUMENT_MODIFICATION_REJECT + "/" + id)

        notifySuccess("Nộp thành công")
        dispatch({ type: "close_modal_confirm_bmcl_bosunghosotailieu", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)
    }

    return (
        <>
            <Modal
                footer={null}
                title="Nộp hồ sơ"
                style={{
                    top: 200,
                }}
                open={open}
                onOk={handleOk}
                onCancel={handleCancle}
            >
                <div className="my-[12px]">
                    <div className="flex">
                        <div className="ml-[12px]">
                            Xác nhận nộp hồ sơ&nbsp;
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button className="mx-[8px] bg-green-500 text-white font-medium disabled:opacity-40" onClick={handleClickApprove}>Xác nhận</Button>

                </div>
            </Modal>


        </>

    )
}

export const ModalModificationDocumentAddedDocument = () => {
    const p = useSelector(state => state.modalModificationDocumentAddedDocument)
    const open = useSelector(state => state.modalModificationDocumentAddedDocument.state)
    const IDFile = useSelector(state => state.modalModificationDocumentAddedDocument.id)
    const dispatch = useDispatch();
    const [isCheck, setIsCheck] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)

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
        dispatch({ type: "close_modal_confirm_bmcl_hosotailieudabosung", id: null })
    }

    const handleClickViewFile = () => {
        if (IDFile === null || IDFile === undefined) return;
        dispatch(OpenFile(IDFile))
    }

    const handleClickViewDocCategory = () => {
        if (IDFile === null || IDFile === undefined) return;
        dispatch({ type: "open", id: IDFile })
    }

    const handleClickApprove = async () => {
        await axiosHttpService.post(API_DOCUMENT_MODIFICATION_APPROVE, { idFile: IDFile })
        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [{
            id: IDFile, current_state: 3,
            new_state: 3 + 1
        }])

        const added = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT_ADDED)
        const id = added.data.find(item => item.idFile === IDFile).id
        await axiosHttpService.delete(API_DOCUMENT_MODIFICATION_REJECT_ADDED + "/" + id)

        notifySuccess("Duyệt thành công")
        dispatch({ type: "close_modal_confirm_bmcl_hosotailieudabosung", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)

    }

    const handleClickReject = async () => {
        await axiosHttpService.post(API_DOCUMENT_MODIFICATION_REJECT, { idFile: IDFile })
        notifySuccess("Đã trả về hồ sơ")

        const added = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT_ADDED)
        const id = added.data.find(item => item.idFile === IDFile).id
        await axiosHttpService.delete(API_DOCUMENT_MODIFICATION_REJECT_ADDED + "/" + id)

        dispatch({ type: "close_modal_confirm_bmcl_hosotailieudabosung", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)
    }

    return (
        <>
            <Modal
                footer={null}
                title="Duyệt hồ sơ"
                style={{
                    top: 200,
                }}
                open={open}
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
        </>

    )
}
