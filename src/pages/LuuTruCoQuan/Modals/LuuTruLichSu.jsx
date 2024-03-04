import { Modal } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PlanAPIService from "src/service/api/PlanAPIService"
import UserAPIService from "src/service/api/userAPIService"

export const ModalConfirmSendPlan = ({
    handleSendPlan
}) => {
    const open = useSelector(state => state.modalConfirmSendPlanLuuTruLichSu.state)
    const id = useSelector(state => state.modalConfirmSendPlanLuuTruLichSu.id)
    const name = useSelector(state => state.modalConfirmSendPlanLuuTruLichSu.name)
    const [files, setFiles] = useState([])
    const [organ, setOrgan] = useState({ name: "" })
    const dispatch = useDispatch();

    const handleOk = () => {
        dispatch({
            type: "close_modal_confirm_send_plan_luu_tru_lich_su"
        })
        handleSendPlan(id)
    }

    const handleCancel = () => {
        dispatch({
            type: "close_modal_confirm_send_plan_luu_tru_lich_su"
        })
    }

    const fetchFilesByPlanId = async (id) => {
        const res = await PlanAPIService.getFileByPlanNLLSId(id)
        if (res.status === 200) {
            setFiles(res.data)
        }
    }

    const fetchUserOrgan = async () => {
        const res = await UserAPIService.getUserOrgan()
        setOrgan(res)
    }

    useEffect(() => {
        if (!open) return;
        fetchFilesByPlanId(id)
    }, [open, id])

    useEffect(() => {
        fetchUserOrgan()
    }, [])

    console.log("files", files)

    return (
        <Modal
            onCancel={handleCancel}
            onOk={handleOk}
            open={open}
            title="Xác nhận gửi kế hoạch"
        >

            <div className="flex flex-col gap-y-[10px]">
                <div className="flex items-center">
                    <div className="text-[20px] bold">Bên gửi: &nbsp;</div>
                    <div className="text-[20px]">{organ.name}</div>
                </div>

                <div className="flex items-center">
                    <div className="text-[20px] bold">Bên nhận: &nbsp;</div>
                    <div className="text-[20px]">Trung tâm lưu trữ lịch sử</div>
                </div>

                <div className="flex items-center">
                    <div className="text-[20px] bold">Tên kế hoạch: &nbsp;</div>
                    <div className="text-[20px]">{name}</div>
                </div>

                <div>
                    <p className="text-[20px] bold">Danh sách hồ sơ:</p>
                    <ul className="ml-[20px]">
                        {files.map((file, index) => {
                            return (
                                <li key={index}>
                                    <div className="flex items-center">
                                        <div className="text-[20px]">{file.title}</div>
                                    </div>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
        </Modal>
    )
}

