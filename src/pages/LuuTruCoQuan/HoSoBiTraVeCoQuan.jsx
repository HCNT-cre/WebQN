import {Table} from "src/custom/Components";
import {useEffect, useState} from "react";
import {HO_SO_NOP_LUU_LICH_SU_TRA_VE} from "src/storage/Storage";
import FileAPIService from "src/service/api/FileAPIService";
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {ModalRejectReason} from "src/pages/Modals";
import {notifySuccess} from "src/custom/Function";

const HoSoBiTraVeCoQuan = () => {
    const [stateCheckBox, setStateCheckBox] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState([])
    const dispatch = useDispatch();
    const handleClickRejectReason = (reason) => {
        dispatch({type: "open_modalRejectReason", reason});
    }
    const fetchData = async () => {
        setIsLoading(true);
        const files = await FileAPIService.getFilesByState(8);
        files && setFiles(files.map((file) => {
            return {
                id: file.id,
                gov_file_code: (
                    <p>
                        {file.gov_file_code || ""}
                    </p>
                ),
                title: (
                    <p>
                        {file.title || ""}
                    </p>
                ),
                organ_id_name: file.organ_id_name || "",
                sheet_number: file.sheet_number || "",
                total_doc: file.total_doc || "",
                start_date: file.start_date || "",
                end_date: file.end_date || "",
                maintenance_name: file.maintenance_name || "",
                rights: file.rights || "",
                reject_reason:
                    <Button
                    onClick={() => handleClickRejectReason(file.reject_reason)}
                    className="text-[12px]"
                    >
                    Lí do trả về
                </Button>,
            }
        }))
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDayVaoKho = async () => {
        const ids = stateCheckBox.map((item) => item.split('checkbox')[1]);
        console.log('ids', ids)
        const payload = ids.map((id) => {
            console.log('id', id)
            return {
                id: id,
                current_state: 0,
                new_state: 10
            }
        })

        await FileAPIService.updateState(payload);
        setTimeout(() => {
            fetchData();
            notifySuccess("Đã đẩy vào kho lưu trữ cơ quan")
        }, 300)


    }

    return (
        <div className="w-full">
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Lưu trữ cơ quan / Hồ sơ nộp lưu lịch sử bị trả về
                    </span>
                </p>

            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold ">Hồ sơ nộp lưu lịch sử bị trả về</p>
            </div>
            <div className="mt-[16px] mx-[24px] flex justify-end">
                <div className="w-[20%] text-white text-center px-[5px] rounded-[5px] flex justify-start">
                    <Button
                        onClick={() => handleDayVaoKho()}
                        className={`rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] text-white items-center`}
                    >
                        Đẩy vào kho lưu trữ cơ quan
                    </Button>
                </div>
            </div>

            <Table
                isCheckBox={true}
                setStateCheckBox={setStateCheckBox}
                fieldNames={HO_SO_NOP_LUU_LICH_SU_TRA_VE}
                fieldDatas={files}
                isLoading={isLoading}
            />
            <ModalRejectReason/>
        </div>
    )
}
export default HoSoBiTraVeCoQuan;