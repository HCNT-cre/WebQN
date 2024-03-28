import { Modal, Input, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserAPIService from "src/service/api/userAPIService";
import { SearchOutlined } from '@ant-design/icons';
import PlanAPIService from "src/service/api/PlanAPIService";
import FileAPIService from "src/service/api/FileAPIService";
import { ENUM_STATE_PLAN } from "src/storage/Storage";


export const ChonNguoiDuyetKeHoach = (
) => {

    const open = useSelector(state => state.modalChoosePerson.state);
    const planIds = useSelector(state => state.modalChoosePerson?.data?.planIds);
    const [approverIds, setApproverIds] = useState([]);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);

    const handleOk = async () => {
        try {
            planIds.forEach(async id => {
                await PlanAPIService.updateStatePlan(id, ENUM_STATE_PLAN.CHO_DUYET);
                await FileAPIService.updateStateByIdPlan(id, {
                    current_state: 4, // luu tru co quan
                    new_state: 5, // nop luu lich su
                });
            });
            await PlanAPIService.sendNLLSPLanInternal(planIds, approverIds);
            dispatch({ type: "close_modal_choose_person", success: true });
        } catch (err) {
            dispatch({ type: "close_modal_choose_person", success: false });
        }


    };

    const handleCancel = () => {
        dispatch({ type: "close_modal_choose_person" });
    };

    const handleSearch = () => {
        console.log("search");
    };

    const onChange = (e, userId) => {
        console.log(`User with ID ${userId} checked: ${e.target.checked}`);
        if (e.target.checked) {
            setApproverIds([...approverIds, userId]);
        } else {
            setApproverIds(approverIds.filter(id => id !== userId));
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataUser = await UserAPIService.getUserInfo();
                const data = await UserAPIService.getAllUserByOrganID(dataUser.organ_id);
                setUserList(data);
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
            title="Chọn người duyệt kế hoạch"
            bodyStyle={{ maxHeight: '60vh', overflow: 'auto' }}
            width={500}
        >
            <div className="mb-[5px]">
                <Input size="large" placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
            </div>
            <div className="text-xl font-bold text-gray-800 mb-[5px]">
                Danh sách nhân viên
            </div>
            <div className="flex flex-col mb-[5px]">
                {userList && userList.map(user => (
                    <Checkbox
                        key={user.id}
                        onChange={(e) => onChange(e, user.id)}
                    >
                        {user.full_name}
                    </Checkbox>
                ))}
            </div>
        </Modal>
    );
};
