import { Modal, Input, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosHttpService from "src/utils/httpService";
import { SearchOutlined} from '@ant-design/icons';
import PlanAPIService from "src/service/api/PlanAPIService";
import { ENUM_STATE_PLAN } from "src/storage/Storage";

const API_STORAGE_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL

export const SendPlanToOrgan = (
) => {
    const open = useSelector(state => state.tableSendPlanToOrgan.state);
    const planIds = useSelector(state => state.tableSendPlanToOrgan?.data?.planIds);
    const dispatch = useDispatch();
    const [organs, setOrgans] = useState([]);
    const [organIds, setOrganIds] = useState([]);

    const handleOk = async () => {
        try {
            await PlanAPIService.sendNLLSPLanOrgan(planIds, organIds);
            planIds.forEach(async id => {
                await PlanAPIService.updateStatePlan(id, ENUM_STATE_PLAN.DOI_THU_THAP);
            });
            dispatch({ type: "close_table_send_plan_to_organ", success: true });
        } catch (err) {
            console.log(err);
            dispatch({ type: "close_table_send_plan_to_organ", success: false });
        }
    };

    const handleCancel = () => {
        dispatch({ type: "close_table_send_plan_to_organ" });
    };

    const handleSearch = () => {
        console.log("search");
    };

    const onChange = (e, userId) => {
        if (e.target.checked) {
            setOrganIds([...organIds, userId]);
        } else {
            setOrganIds(organIds.filter(id => id !== userId));
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosHttpService.get(API_STORAGE_GET_ORGAN)
                setOrgans(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
            title="Chọn cơ quan nhận kế hoạch"
            bodyStyle={{ maxHeight: '60vh', overflow: 'auto' }}
            width={500}
        >
            <div className="mb-[5px]">
            <Input size="large" placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
            </div>
            <div className="text-xl font-bold text-gray-800 mb-[5px]">
                Danh sách các cơ quan
            </div>
            <div className="flex flex-col mb-[5px]">
                {organs && organs.map(user => (
                    <Checkbox
                        key={user.id}
                        onChange={(e) => onChange(e, user.id)}
                    >
                        {user.name}
                    </Checkbox>
                ))}
            </div>
        </Modal>
    );
};
