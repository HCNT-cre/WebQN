import { Modal, Input, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserAPIService from "src/service/api/userAPIService";
import { SearchOutlined } from '@ant-design/icons';
import PlanAPIService from "src/service/api/PlanAPIService";


export const ModalSendExtraPeople = (
) => {
    const open = useSelector(state => state.modalSendExtraPeople.open);
    const planIds = useSelector(state => state.modalSendExtraPeople.planIds);
    const [userIds, setUserIds] = useState([]);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);

    const handleOk = async () => {
        try {
            await PlanAPIService.sendNLLSPLanInternal(planIds, userIds);
            dispatch({ type: "close_modal_send_extra_people", success: true });
        } catch (err) {
            console.error(err)
            dispatch({ type: "close_modal_send_extra_people", success: false });
        }
    };

    const handleCancel = () => {
        dispatch({ type: "close_modal_send_extra_people" });
    };

    const onChange = (e, userId) => {
        if (e.target.checked) {
            setUserIds([...userIds, userId]);
        } else {
            setUserIds(userIds.filter(id => id !== userId));
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
            width={550}
        >
            <div className="mb-[5px]">
                <Input size="large" placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
            </div>
            <div className="text-xl font-bold text-gray-800 mb-[5px]">
                Danh sách nhân viên
            </div>
            <div className="flex flex-col mb-5">
                {userList && userList.map(user => (
                    <label key={user.id} className="flex items-center border-b border-gray-200 py-2">
                        <Checkbox
                            onChange={(e) => onChange(e, user.id)}
                            className="mr-4"
                        />
                        <div className="font-medium flex-1">{user.full_name}</div>
                        <div className="font-bold ">{user.email}</div>
                    </label>
                ))}
            </div>


        </Modal>
    );
};
