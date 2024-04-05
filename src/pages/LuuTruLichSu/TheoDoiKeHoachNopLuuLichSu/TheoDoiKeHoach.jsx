import { Link } from "react-router-dom"
import { Input, Button } from "antd"
import { Table } from "src/custom/Components"
import { useState, useEffect } from "react"
import PlanAPIService from "src/service/api/PlanAPIService";
import { THEO_DOI_KE_HOACH_NOP_LUU_LICH_SU } from "src/storage/StorageOffice";
import { notifyError, notifySuccess } from "src/custom/Function";
import { ENUM_STATE_PLAN } from "src/storage/Storage";
import FileAPIService from "src/service/api/FileAPIService";

const TheoDoiKeHoach = () => {
    const [stateCheckBox, setStateCheckBox] = useState([]);
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const reFetchData = async () => {
        setIsLoading(true);
        const plansRaw = await PlanAPIService.getSentNLLSPlan();
        const plans = [];
        for (const planRaw of plansRaw) {
            const row = {
                id: planRaw.id,
                name: <Link to={`./${planRaw.id}`} className="cursor-pointer"> {planRaw.name}</Link>,
                organ_name: planRaw.organ_name,
                state: <button>{planRaw.state}</button>,
            };
            plans.push(row);
        }
        setPlan(plans);
        setIsLoading(false);
    };

    useEffect(() => {
        reFetchData();
    }, []);

    const handleChangeStateFileOfPlan = async () => {
        try {
            const planIds = stateCheckBox.map((id) => id.split("checkbox")[1]);
            planIds.forEach(async (id) => {
                let res;
                res = await PlanAPIService.updateStatePlan(id, ENUM_STATE_PLAN.DOI_SO_NOI_VU_DUYET);
                if (res.error_code == 400) {
                    notifyError("Cập nhật trạng thái kế hoạch thất bại");
                }
                res = await FileAPIService.updateStateFileByNLLSIds(id);
                if (res.error_code == 400) {
                    notifyError("Cập nhật trạng thái hồ sơ thất bại");
                }
            })

            notifySuccess("Cập nhật trạng thái thành công");
        } catch (error) {
            notifyError("Thay đổi trạng thái thất bại");
        }
    };


    return <div className="w-full">
        <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
            <p className="text-[14px] font-300 cursor-pointer ">
                <span className="text-[rgba(0,0,0,.45)]">
                    <Link to="/thu-thap-va-nop-luu/tham-dinh-ho-so">
                        Lưu trữ lịch sử /{" "}
                    </Link>
                </span>
                <span>
                    <Link to="/thu-thap-va-nop-luu/tham-dinh-ho-so">
                        Phê duyệt và thẩm định kế hoạch nộp lưu lịch sử
                    </Link>
                </span>
            </p>
        </div>

        <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
            <p className="text-[20px] font-bold ">Phê duyệt và thẩm định kế hoạch nộp lưu lịch sử</p>
        </div>

        <div className="mt-[16px] mx-[24px] flex ">
            <div className="w-[11.11111%] px-[5px]">
                <Input
                    allowClear
                    name="title"
                    placeholder="Tìm kiếm tên kế hoạch"
                    className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px] flex items-center"
                ></Input>
            </div>
            <div className="w-[11.11111%] px-[5px]">
                <Input
                    name="start_date"
                    placeholder="Năm"
                    type="text"
                    onBlur={(e) => (e.target.type = "text")}
                    className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
                ></Input>
            </div>
            <div className="w-[11.11111%] px-[5px]">
                <Input
                    name="end_date"
                    placeholder="Cơ quan đơn vị"
                    type="text"
                    onBlur={(e) => (e.target.type = "text")}
                    className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
                ></Input>
            </div>
            <div className="w-[11.11111%] px-[5px]">
                <Button
                    onClick={() => handleChangeStateFileOfPlan()}
                    className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[90px] py-[1px] text-[12px] text-white items-center"
                >
                    <div className="mr-[8px]">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    Gửi Sở Nội vụ phê duyệt

                </Button>
            </div>

        </div>

        <Table
            setStateCheckBox={setStateCheckBox}
            fieldNames={THEO_DOI_KE_HOACH_NOP_LUU_LICH_SU}
            fieldDatas={plan}
            isLoading={isLoading}
            isCheckBox={true}
            selectedFiles={stateCheckBox}
        />
    </div>
}

export default TheoDoiKeHoach;
