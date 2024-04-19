import { Modal, Checkbox, Button, Select, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpenFile } from "../actions/formFile";
import axiosHttpService from "src/utils/httpService";
import { notifyError, notifySuccess } from "../custom/Function";
import { ENUM_STATE_PLAN, ENUM_STATE_FILE, STATE, ENUM_STATE_NLLS_PLAN } from "../storage/Storage";

import UserAPIService from "src/service/api/userAPIService";
import LuutrucoquanAPIService from "src/service/api/LuutrucoquanAPIService";
import FileAPIService from "src/service/api/FileAPIService";
import PlanAPIService from "src/service/api/PlanAPIService";
import OrganAPIService from "src/service/api/organAPIService";
import CategoryAPIService from "src/service/api/categoryAPIService";

const API_GOV_FILE_UPDATE_STATE = import.meta.env.VITE_API_GOV_FILE_UPDATE_STATE
const API_GOV_FILE_SET_DRAWER = import.meta.env.VITE_API_GOV_FILE_SET_DRAWER
const API_PLAN = import.meta.env.VITE_API_PLAN;
const API_DOWNLOAD_ATTACHMENT = import.meta.env.VITE_API_DOWNLOAD_ATTACHMENT;

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

    const getNextState = (current_state) => {
        if (STATE[current_state] === ENUM_STATE_FILE.NOP_LUU_CO_QUAN) {
            return 9; // DA_NHAN_NOP_LUU
        }
        if (STATE[current_state] === ENUM_STATE_FILE.NOP_LUU_LICH_SU) {
            return 6; // LUU_TRU_LICH_SU
        }
        if (STATE[current_state] === ENUM_STATE_FILE.HSCL_GIAO_NOP) {
            return 10; // CHO_XEP_KHO
        }
        return current_state + 1;
    }

    const getRejectState = (current_state) => {
        if (STATE[current_state] === ENUM_STATE_FILE.NOP_LUU_CO_QUAN) {
            return 7; // NOP_LUU_CO_QUAN_BI_TRA_VE
        }
        if (STATE[current_state] === ENUM_STATE_FILE.NOP_LUU_LICH_SU) {
            return 8; // NOP_LUU_LICH_SU_BI_TRA_VE
        }
        if (STATE[current_state] === ENUM_STATE_FILE.HSCL_GIAO_NOP) {
            return 13; // HSCL_GIAO_NOP_BI_TRA_VE
        }
        return current_state - 1;
    }

    const handleClickApprove = async () => {
        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [{
            id: IDFile, current_state: current_state,
            new_state: getNextState(current_state)
        }])
        notifySuccess("Duyệt thành công")
        reFetchFile()
        dispatch({ type: "close_modal_confirm_nopluucoquan", id: null })
    }

    const handleClickReject = () => {
        axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [
            { id: IDFile, current_state: current_state, new_state: getRejectState(current_state) }]) // TODO
        notifySuccess("Đã trả về hồ sơ")
        dispatch({ type: "close_modal_confirm_nopluucoquan", id: null })

        if (reFetchFile !== null) {
            reFetchFile()
        }
    }

    return (
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
        drawer: null,
    })

    const IDFile = useSelector(state => state.modalStoreOrgan.id)
    const [optionShelf, setOptionShelf] = useState([])
    const [optionOrgan, setOptionOrgan] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [optionWarehouseRoom, setOptionWarehouseRoom] = useState([])
    const [optionDrawers, setOptionDrawers] = useState([])

    const [shelf, setShelf] = useState(null)
    const [warehouse, setWarehouse] = useState(null)
    const [warehouseRoom, setWarehouseRoom] = useState(null)
    const [drawer, setDrawer] = useState(null)

    const fetchOrganName = async () => {
        const response = await UserAPIService.getUserOrgan();
        let organObject = {
            value: response.id,
            label: response.name
        }
        setOptionOrgan([organObject]);
        handleChangeRequest('organ', organObject.value)
    }

    useEffect(() => {
        const fetchWarehouse = async (id) => {
            if (!id) return;
            const warehouse = await LuutrucoquanAPIService.getWarehouseByOrganId(id);
            const raws = []
            for (const data of warehouse) {
                raws.push({
                    value: data.id,
                    label: data.name
                })
            }
            setOptionWarehouse(raws)
        }
        fetchWarehouse(request['organ'])
        setWarehouse(null)
        handleChangeRequest('warehouse', null)
    }, [request['organ']])


    useEffect(() => {
        const fetchWarehouseRoom = async (id) => {
            if (!id) return;
            const warehouseRoom = await LuutrucoquanAPIService.getWarehouseRoomByWarehouseId(id);
            const raws = []
            for (const data of warehouseRoom) {
                raws.push({
                    value: data.id,
                    label: data.name
                })
            }
            setOptionWarehouseRoom(raws)
        }
        fetchWarehouseRoom(request['warehouse'])
        setWarehouseRoom(null)
        handleChangeRequest('warehouseroom', null)
    }, [request['warehouse']])

    useEffect(() => {
        const fetchShelf = async (id) => {
            if (!id) return;
            const shelf = await LuutrucoquanAPIService.getShelfByWarehouseRoomId(id);
            const raws = []
            for (const data of shelf) {
                raws.push({
                    value: data.id,
                    label: data.name
                })
            }
            setOptionShelf(raws)
        }
        fetchShelf(request['warehouseroom'])
        setShelf(null)
        handleChangeRequest('shelf', null)
    }, [request['warehouseroom']])

    useEffect(() => {
        const fetchDrawer = async (id) => {
            if (!id) return;
            const drawer = await LuutrucoquanAPIService.getDrawerByShelfId(id);
            const raws = []
            for (const data of drawer) {
                raws.push({
                    value: data.id,
                    label: data.name
                })
            }
            setOptionDrawers(raws)
        }
        fetchDrawer(request['shelf'])
        setDrawer(null)
        handleChangeRequest('drawer', null)
    }, [request['shelf']])

    useEffect(() => {
        fetchOrganName()
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
                notifyError("Vui lòng chọn đủ thông tin " + key)
                return
            }
        }

        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [
            { id: IDFile, current_state: 10, new_state: 4 } // CHO_XEP_KHO -> LUU_TRU_CO_QUAN
        ]);
        await axiosHttpService.post(API_GOV_FILE_SET_DRAWER, [
            { gov_file_id: IDFile, drawer_id: request.drawer }
        ]);

        // await axiosHttpService.post(API_STORAGE_POST_FILE_ORGAN_STORAGE, { ...request, file_id: IDFile })
        dispatch({ type: "close_modal_confirm_luutrucoquan", id: null })
        notifySuccess("Duyệt thành công")
        reFetchFile()
    }

    //   const warehouseDisabled = !optionOrgan.find(item => item.value === request.organ);
    let warehouseRoomDisabled = !request.warehouse || !optionWarehouse.find(item => item.value === request.warehouse);
    let shelfDisabled = !request.warehouseroom || !optionWarehouseRoom.find(item => item.value === request.warehouseroom);
    let drawerDisabled = !request.shelf || !optionShelf.find(item => item.value === request.shelf);

    return (
        <div>
            <Modal
                title="Xếp hồ sơ vào kho"
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
                        defaultValue={optionOrgan[0]?.value}
                        optionFilterProp="children"
                        onChange={(value) => handleChangeRequest('organ', value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionOrgan}
                        disabled={true}
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
                            setWarehouse(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouse}
                        value={warehouse}
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
                            handleChangeRequest('warehouseroom', value)
                            setWarehouseRoom(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouseRoom}
                        value={warehouseRoom}
                        disabled={warehouseRoomDisabled}
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
                        options={optionShelf}
                        value={shelf}
                        disabled={shelfDisabled}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Hộp</span>
                    <Select
                        name="warehouseroom"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn hộp"
                        optionFilterProp="children"
                        onChange={(value, ev) => {
                            handleChangeRequest('drawer', value)
                            setDrawer(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        value={drawer}
                        options={optionDrawers}
                        disabled={drawerDisabled}
                    />
                </div>
                <div className="flex justify-center">
                    <Button className="mx-[8px] bg-green-500 text-white font-medium disabled:opacity-40" onClick={handleClickApprove}>Xếp vào kho</Button>
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

    const getNextState = (current_state) => {
        if (STATE[current_state] === ENUM_STATE_FILE.NOP_LUU_CO_QUAN) {
            return 9; // DA_NHAN_NOP_LUU
        }
        if (STATE[current_state] === ENUM_STATE_FILE.NOP_LUU_LICH_SU) {
            return 6; // LUU_TRU_LICH_SU
        }
        if (STATE[current_state] === ENUM_STATE_FILE.HSCL_GIAO_NOP) {
            return 10; // CHO_XEP_KHO
        }
        return current_state + 1;
    }

    const handleClickApprove = async () => {
        //  await axiosHttpService.post(API_DOCUMENT_MODIFICATION_APPROVE, { idFile: IDFile })
        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [{
            id: IDFile, current_state: 12,
            new_state: getNextState(12) // HSCL_GIAO_NOP -> CHO_XEP_KHO
        }])
        notifySuccess("Duyệt thành công")
        dispatch({ type: "close_modal_confirm_bmcl_pheduyetluukho", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)

    }

    const handleClickReject = async () => {
        //  await axiosHttpService.post(API_DOCUMENT_MODIFICATION_REJECT, { idFile: IDFile })
        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [{
            id: IDFile, current_state: 12,
            new_state: 13 // HSCL_GIAO_NOP -> HSCL_BI_TRA_VE
        }])
        notifySuccess("Đã trả về hồ sơ")
        dispatch({ type: "close_modal_confirm_bmcl_pheduyetluukho", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)
    }

    return (
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
    )
}

export const ModalModificationDocumentAddDocument = () => {
    const open = useSelector(state => state.modalModificationDocumentAddDocument.state)

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
        notifySuccess("Nộp thành công")
        dispatch({ type: "close_modal_confirm_bmcl_bosunghosotailieu", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)
    }

    return (
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
        //    await axiosHttpService.post(API_DOCUMENT_MODIFICATION_APPROVE, { idFile: IDFile })
        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [{
            id: IDFile, current_state: 3,
            new_state: 3 + 1
        }])

        //   const added = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT_ADDED)
        const id = added.data.find(item => item.idFile === IDFile).id
        //   await axiosHttpService.delete(API_DOCUMENT_MODIFICATION_REJECT_ADDED + "/" + id)

        notifySuccess("Đã trình duyệt lưu kho hồ sơ bổ sung thành công")
        dispatch({ type: "close_modal_confirm_bmcl_hosotailieudabosung", id: null })
        // setTimeout(() => {
        //     document.location.reload()
        // }, 1000)

    }

    const handleClickReject = async () => {
        // await axiosHttpService.post(API_DOCUMENT_MODIFICATION_REJECT, { idFile: IDFile })
        notifySuccess("Đã trả về hồ sơ")

        //  const added = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT_ADDED)
        const id = added.data.find(item => item.idFile === IDFile).id
        //   await axiosHttpService.delete(API_DOCUMENT_MODIFICATION_REJECT_ADDED + "/" + id)

        dispatch({ type: "close_modal_confirm_bmcl_hosotailieudabosung", id: null })
        setTimeout(() => {
            document.location.reload()
        }, 1000)
    }

    return (
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
    )
}

export const ModalModificationDocumentRequireAddDoc = () => {
    const open = useSelector(state => state.modalModificationDocumentRequireAddDocReducer.state)
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setModalOpen(open)
    }, [open])

    const handleOk = () => {
        setModalOpen(false)
    }

    const handleCancle = () => {
        dispatch({ type: "close_modal_confirm_bmcl_yeucaubosunghosotailieudaluukho", id: null })
    }

    return (
        <Modal
            footer={null}
            title="Tạo yêu cầu bổ sung tài liệu"
            style={{
                top: 200,
            }}
            open={open}
            onOk={handleOk}
            onCancel={handleCancle}
        >
            <div>
                <div className="flex justify-between py-[12px]">
                    <span>Tên yêu cầu</span>
                    <Input
                        name="name"
                        type="text"
                        className="w-[70%]"
                    />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Ngày quyết định</span>
                    <Input
                        name="date"
                        type="date"
                        className="w-[70%]"
                    />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Cơ quan / Đơn vị  </span>
                    <Select
                        value="Sở thông tin và truyền thông"
                        name="organ"
                        className="w-[70%]"
                    />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Văn bản</span>
                    <div
                        className="w-[70%]"
                    >
                        <Button> Chọn văn bản</Button>
                    </div>
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Các văn bản đã chọn</span>
                    <div className="w-[70%]">
                        <Button className="mr-[5px]">
                            07-ttg.signed.pdf
                        </Button>
                        <Button className="mr-[5px]">
                            TTTT.pdf
                        </Button>
                    </div>
                </div>
            </div>


        </Modal >

    )
}

export const ModalRecoverFile = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.modalRecoverFile.open);
    const ids = useSelector(state => state.modalRecoverFile.ids);
    const reFetchData = useSelector(state => state.modalRecoverFile.reFetchData);

    const handleOk = async () => {

        ids.forEach(async (id) => {
            await PlanAPIService.removeFileFromPlanTieuHuy(id);
        });

        const payload = ids.map((id) => {
            return {
                id,
                current_state: 16,
                new_state: 17
            }
        })

        await FileAPIService.updateState(payload);

        notifySuccess("Đã khôi phục hồ sơ");
        dispatch({
            type: "close_modal_recover_file"
        });
        setTimeout(() => {
            reFetchData();
        }, 500);
    }

    const handleCancle = async () => {
        dispatch({
            type: "close_modal_recover_file"
        })
    }

    return (
        <Modal
            footer={null}
            title="Đồng ý khôi phục hồ sơ"
            style={{
                top: 200,
            }}
            open={open}
            onOk={handleOk}
            onCancel={handleCancle}
        >
            <div className="flex justify-center">
                <Button className="mx-[8px] bg-green-500 text-white font-medium disabled:opacity-40" onClick={handleOk}>Khôi phục</Button>
                <Button className="mx-[8px] bg-red-500 text-white font-medium" onClick={handleCancle}>Huỷ</Button>
            </div>
        </Modal >
    )
}


export const ModalPlan = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.modalPlanReducer.state);
    const type = useSelector(state => state.modalPlanReducer.type);
    const id = useSelector(state => state.modalPlanReducer.id);
    const reFetchData = useSelector(state => state.modalPlanReducer.reFetchData);
    const oldState = useSelector(state => state.modalPlanReducer.oldState);
    const handleOk = async () => {
        delete oldState["attachment"];
        await axiosHttpService.put(API_PLAN + '/' + oldState.id, {
            ...oldState,
            state: ENUM_STATE_PLAN.DA_DUYET,
            type: type
        });

        notifySuccess("Đã duyệt kế hoạch");
        dispatch({
            type: "close_modal_plan"
        });
        setTimeout(() => {
            reFetchData();
        }, 500);
    }

    const handleCancle = async () => {
        delete oldState["attachment"];
        await axiosHttpService.put(API_PLAN + '/' + id, {
            ...oldState,
            state: ENUM_STATE_PLAN.TU_CHOI,
            type: type,

        });

        notifySuccess("Đã từ chối kế hoạch");
        dispatch({
            type: "close_modal_plan"
        });
        setTimeout(() => {
            reFetchData();
        }, 500);
    }

    return (
        <Modal
            footer={null}
            title="Đồng ý duyệt hồ sơ"
            style={{
                top: 200,
            }}
            open={open}
            onOk={handleOk}
            onCancel={() => {
                dispatch({
                    type: "close_modal_plan"
                });
            }}
        >
            <div className="flex justify-center">
                <Button className="mx-[8px] bg-green-500 text-white font-medium disabled:opacity-40" onClick={handleOk}>Duyệt</Button>
                <Button className="mx-[8px] bg-red-500 text-white font-medium" onClick={handleCancle}>Từ chối</Button>
            </div>
        </Modal >
    )
}


export const ModalStateNLLSPlanOrgan = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.modalStateNLLSPlanOrgan.open);
    const planId = useSelector(state => state.modalStateNLLSPlanOrgan.planId);
    const organId = useSelector(state => state.modalStateNLLSPlanOrgan.organId);
    const reFetchData = useSelector(state => state.modalStateNLLSPlanOrgan.reFetchData);

    const handleOk = async () => {
        await PlanAPIService.updateStateNLLSOrgan(planId, organId, ENUM_STATE_NLLS_PLAN.DA_DUYET_NOP_LUU_LICH_SU_TU_CO_QUAN);
        notifySuccess("Đã duyệt");
        dispatch({
            type: "close_modalStateNLLSPlanOrganReducer"
        });
        setTimeout(() => {
            reFetchData();
        }, 500);
    }
    const handleCancle = async () => {
        await PlanAPIService.updateStateNLLSOrgan(planId, organId, ENUM_STATE_NLLS_PLAN.TU_CHOI_NOP_LUU_LICH_SU_TU_CO_QUAN);
        notifySuccess("Đã từ chối");
        dispatch({
            type: "close_modalStateNLLSPlanOrganReducer"
        });
        setTimeout(() => {
            reFetchData();
        }, 500);
    }
    return (
        <Modal
            footer={null}
            title="Đồng ý duyệt"
            style={{
                top: 200,
            }}
            open={open}
            onOk={handleOk}
            onCancel={() => {
                dispatch({
                    type: "close_modalStateNLLSPlanOrganReducer"
                });
            }}
        >
            <div className="flex justify-center">
                <Button className="mx-[8px] bg-green-500 text-white font-medium disabled:opacity-40" onClick={handleOk}>Duyệt</Button>
                <Button className="mx-[8px] bg-red-500 text-white font-medium" onClick={handleCancle}>Từ chối</Button>
            </div>
        </Modal >
    )
}

export const ModalOpenAttachments = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.modalOpenAttachments.open);
    const attachments = useSelector(state => state.modalOpenAttachments.attachments);

    const handleOk = async () => {
        dispatch({
            type: "close_modalOpenAttachments"
        });
    }

    const handleDownloadAttachment = async (fileUrl) => {
        const response = await axiosHttpService.get(API_DOWNLOAD_ATTACHMENT + '/' + fileUrl, {
            responseType: "blob",
        });
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileUrl.split("/").pop());
        document.body.appendChild(link);
        link.click();
    }

    return (
        <Modal
            title="Danh sách tệp đính kèm"
            open={open}
            onOk={handleOk}
            onCancel={handleOk}
            footer={null}
        >
            <div >
                {attachments && attachments.map((attachment) => {
                    return (
                        <div key={attachment} className="mt-2">
                            <Button
                                onClick={() => handleDownloadAttachment(attachment)}
                            >{attachment.split('/')[2]}</Button>
                        </div>
                    )
                })}
            </div>
        </Modal >
    )
}


export const ModalCreateDanhMucCoQuan = () => {
    const open = useSelector(state => state.modalCreateDanhMucCoQuan.open);
    const reFetchData = useSelector(state => state.modalCreateDanhMucCoQuan.reFetchData);
    const order = useSelector(state => state.modalCreateDanhMucCoQuan.order);
    const parent = useSelector(state => state.modalCreateDanhMucCoQuan.parent);
    const select = useSelector(state => state.modalCreateDanhMucCoQuan.select);
    
    const dispatch = useDispatch()
    const [request, setRequest] = useState({})
    const [selectOrder, setSelectOrder] = useState([])
    const [defaultValue, setDefaultValue] = useState("Danh mục gốc")
    const [organ, setOrgan] = useState([])

    useEffect(() => {
        let selectFiltered = null
        const newSelect = []

        if (order === 1) {
            setDefaultValue("Danh mục gốc")
            setSelectOrder([])
            return
        }

        if (order === 2)
            selectFiltered = select.filter(item => item.order === 1)
        if (order === 3)
            selectFiltered = select.filter(item => item.order === 2)

        selectFiltered.forEach(item => {
            const newItem = {
                label: item.name,
                value: item.id
            }
            newSelect.push(newItem)
        })

        setDefaultValue(newSelect.filter(item => item.value === parent?.id)[0].label)
        setSelectOrder(prev => newSelect)
    }, [order])

    useEffect(() => {
        const fetchAllOrgans = async () => {
            const organs = await OrganAPIService.getAllOrgan();
            setOrgan(organs.map(organ => ({
                label: organ.name,
                value: organ.id
            })));
        }
        fetchAllOrgans();
    }, [])

    const handleOk = async () => {
        request["order"] = order
        
        if (parent) {
            request["parent"] = parent?.id
        }else {
            request["parent"] = null
        }
    
        await CategoryAPIService.createCategoryFile(request)

        setTimeout(() => {
            notifySuccess("Đã tạo danh mục thành công");
            reFetchData()
            setRequest({})
            dispatch({
                type: "close_modalCreateDanhMucCoQuanReducer"
            })
        }, 500)
    }

    const handleCancel = () => {
        dispatch({
            type: "close_modalCreateDanhMucCoQuanReducer"
        })
    }

    const handleChangeRequest = (name, value) => {
        setRequest({
            ...request,
            [name]: value
        })
    }

    return (
        <Modal
            title="Tạo mới"
            style={{
                top: 20,
            }}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div>
                <div className="flex justify-between py-[12px]">
                    <span>Tên</span>
                    <Input name="name" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" value={request["name"]} />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Năm</span>
                    <Input name="year" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" value={request["year"]} />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Cơ quan</span>
                    <Select
                        options={organ}
                        name="organ"
                        value={request["organ"]}
                        onChange={(value) => handleChangeRequest("organ", value)}
                        type="text"
                        className="w-[70%]"
                    />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Đề mục / Nhóm lớn</span>
                    <Select
                        options={selectOrder}
                        value={defaultValue}
                        name="parent"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="text"
                        className="w-[70%]"
                    // value={order === 1 ? "Danh mục gốc" : request["parent"]}
                    />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Mô tả</span>
                    <Input name="description" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" value={request["description"]} />
                </div>
            </div>
        </Modal>
    )
}


export const ModalXepKhoLuuTruLichSu = () => {
    const dispatch = useDispatch()
    const open = useSelector(state => state.modalXepKhoLuuTruLichSu.open)
    const reFetchFile = useSelector(state => state.reFetchFile.fetchFileFunction)
    const IDFile = useSelector(state => state.modalXepKhoLuuTruLichSu.id)

    const [optionShelf, setOptionShelf] = useState([])
    const [optionOrgan, setOptionOrgan] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [optionWarehouseRoom, setOptionWarehouseRoom] = useState([])
    const [optionDrawers, setOptionDrawers] = useState([])

    const [shelf, setShelf] = useState(null)
    const [warehouse, setWarehouse] = useState(null)
    const [warehouseRoom, setWarehouseRoom] = useState(null)
    const [drawer, setDrawer] = useState(null)

    const [request, setRequest] = useState({
        organ: null,
        warehouse: null,
        warehouseroom: null,
        shelf: null,
        drawer: null,
    })

    console.log('open', open)
    const fetchOrganName = async () => {
        const response = await UserAPIService.getUserOrgan();
        let organObject = {
            value: response.id,
            label: response.name
        }
        setOptionOrgan([organObject]);
        handleChangeRequest('organ', organObject.value)
    }

    useEffect(() => {
        const fetchWarehouse = async (id) => {
            if (!id) return;
            const warehouse = await LuutrucoquanAPIService.getWarehouseByOrganId(id);
            const raws = []
            for (const data of warehouse) {
                raws.push({
                    value: data.id,
                    label: data.name
                })
            }
            setOptionWarehouse(raws)
        }
        fetchWarehouse(request['organ'])
        setWarehouse(null)
        handleChangeRequest('warehouse', null)
    }, [request['organ']])

    useEffect(() => {
        const fetchWarehouseRoom = async (id) => {
            if (!id) return;
            const warehouseRoom = await LuutrucoquanAPIService.getWarehouseRoomByWarehouseId(id);
            const raws = []
            for (const data of warehouseRoom) {
                raws.push({
                    value: data.id,
                    label: data.name
                })
            }
            setOptionWarehouseRoom(raws)
        }
        fetchWarehouseRoom(request['warehouse'])
        setWarehouseRoom(null)
        handleChangeRequest('warehouseroom', null)
    }, [request['warehouse']])

    useEffect(() => {
        const fetchShelf = async (id) => {
            if (!id) return;
            const shelf = await LuutrucoquanAPIService.getShelfByWarehouseRoomId(id);
            const raws = []
            for (const data of shelf) {
                raws.push({
                    value: data.id,
                    label: data.name
                })
            }
            setOptionShelf(raws)
        }
        fetchShelf(request['warehouseroom'])
        setShelf(null)
        handleChangeRequest('shelf', null)
    }, [request['warehouseroom']])

    useEffect(() => {
        const fetchDrawer = async (id) => {
            if (!id) return;
            const drawer = await LuutrucoquanAPIService.getDrawerByShelfId(id);
            const raws = []
            for (const data of drawer) {
                raws.push({
                    value: data.id,
                    label: data.name
                })
            }
            setOptionDrawers(raws)
        }
        fetchDrawer(request['shelf'])
        setDrawer(null)
        handleChangeRequest('drawer', null)
    }, [request['shelf']])

    useEffect(() => {
        fetchOrganName()
    }, [])

    const handleChangeRequest = (name, value) => {
        return setRequest((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCancel = () => {
        dispatch({ type: "close_modalXepKhoLuuTruLichSu"})
    }

    const handleOk = () => {
        dispatch({ type: "close_modalXepKhoLuuTruLichSu"})
    }

    const handleClickApprove = async () => {
        for (const key in request) {
            if (request[key] === null) {
                notifyError("Vui lòng chọn đủ thông tin " + key)
                return
            }
        }

        await axiosHttpService.post(API_GOV_FILE_UPDATE_STATE, [
            { id: IDFile, current_state: 19, new_state: 6 } // CHO_XEP_KHO -> LUU_TRU_CO_QUAN
        ]);

        await axiosHttpService.post(API_GOV_FILE_SET_DRAWER, [
            { gov_file_id: IDFile, drawer_id: request.drawer }
        ]);

        dispatch({ type: "close_modalXepKhoLuuTruLichSu", id: null })
        notifySuccess("Duyệt thành công")
        reFetchFile()
    }

    //   const warehouseDisabled = !optionOrgan.find(item => item.value === request.organ);
    let warehouseRoomDisabled = !request.warehouse || !optionWarehouse.find(item => item.value === request.warehouse);
    let shelfDisabled = !request.warehouseroom || !optionWarehouseRoom.find(item => item.value === request.warehouseroom);
    let drawerDisabled = !request.shelf || !optionShelf.find(item => item.value === request.shelf);

    return (
        <div>
            <Modal
                title="Xếp hồ sơ vào kho"
                footer={null}
                style={{
                    top: 200,
                }}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-between py-[12px]">
                    <span>Cơ quan</span>
                    <Select
                        name="organ"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        defaultValue={optionOrgan[0]?.value}
                        optionFilterProp="children"
                        onChange={(value) => handleChangeRequest('organ', value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionOrgan}
                        disabled={true}
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
                            setWarehouse(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouse}
                        value={warehouse}
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
                            handleChangeRequest('warehouseroom', value)
                            setWarehouseRoom(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouseRoom}
                        value={warehouseRoom}
                        disabled={warehouseRoomDisabled}
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
                        options={optionShelf}
                        value={shelf}
                        disabled={shelfDisabled}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Hộp</span>
                    <Select
                        name="warehouseroom"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn hộp"
                        optionFilterProp="children"
                        onChange={(value, ev) => {
                            handleChangeRequest('drawer', value)
                            setDrawer(ev.label)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        value={drawer}
                        options={optionDrawers}
                        disabled={drawerDisabled}
                    />
                </div>
                <div className="flex justify-center">
                    <Button className="mx-[8px] bg-green-500 text-white font-medium disabled:opacity-40" onClick={handleClickApprove}>Xếp vào kho</Button>
                </div>
            </Modal>
        </div>
    )

}
