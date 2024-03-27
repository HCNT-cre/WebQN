import { Modal, Input, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserAPIService from "src/service/api/userAPIService";
import axiosHttpService, { axiosCorsService } from "src/utils/httpService";
const API_STORAGE_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL

const { Search } = Input;

export const SendPlanToOrgan = (
    handleSendPlan
) => {
    const open = useSelector(state => state.tableSendPlanToOrgan.state);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);

    const handleOk = () => {
        dispatch({ type: "close_table_send_plan_to_organ" });
        handleSendPlan();
    };

    const handleCancel = () => {
        dispatch({ type: "close_table_send_plan_to_organ" });
    };

    const handleSearch = () => {
        console.log("search");
    };

    const onChange = (e, userId) => {
        console.log(`User with ID ${userId} checked: ${e.target.checked}`);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosHttpService.get(API_STORAGE_GET_ORGAN)
                console.log("organ:",res);
                setUserList(res.data);
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
                <Search placeholder="Tìm kiếm" onSearch={handleSearch} enterButton />
            </div>
            <div className="text-xl font-bold text-gray-800 mb-[5px]">
                Danh sách các cơ quan
            </div>
            <div className="flex flex-col mb-[5px]">
                {userList.map(user => (
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
