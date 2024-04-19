import { Link } from "react-router-dom"
import { Input, Button } from "antd"
import { Table } from "src/custom/Components"
import { useState, useEffect } from "react"
import PlanAPIService from "src/service/api/PlanAPIService";
import { THEO_DOI_KE_HOACH_NOP_LUU_LICH_SU } from "src/storage/StorageOffice";
import {notifySuccess} from "src/custom/Function";

const SoNoiVuPheDuyet = () => {
    const [stateCheckBox, setStateCheckBox] = useState([]);
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const reFetchData = async () => {
        setIsLoading(true);
        const plansRaw = await PlanAPIService.getSoNoiVuDuyetPlan();
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


    const handleChangeStateFileOfPlanSoNoiVu = async () => {
        const planIds = stateCheckBox.map((item) => item.split("checkbox")[1]);
        await PlanAPIService.approvePlanNLLS(planIds);
        notifySuccess("Thay đổi trạng thái thành công");
        reFetchData();
    }

    return <div className="w-full">
        <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
            <p className="text-[14px] font-300 cursor-pointer ">
                <span className="text-[rgba(0,0,0,.45)]">
                    <Link to="/luu-tru-lich-su/so-noi-vu-phe-duyet">
                        Lưu trữ lịch sử /{" "}
                    </Link>
                </span>
                <span>
                    <Link to="/luu-tru-lich-su/so-noi-vu-phe-duyet">
                        Sở Nội vụ phê duyệt
                    </Link>
                </span>
            </p>
        </div>

        <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
            <p className="text-[20px] font-bold ">Sở Nội vụ phê duyệt</p>
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
            <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
                <Button
                    onClick={() => handleChangeStateFileOfPlanSoNoiVu({"current_state": 18, "new_state": 19})}
                    className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[90px] py-[1px] text-[12px] text-white items-center"
                >
                    <div className="mr-[8px]">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    Phê duyệt lưu trữ lịch sử
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

export default SoNoiVuPheDuyet;
