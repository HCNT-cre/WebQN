import { Modal, Input, Checkbox } from "antd";
import { data } from "jquery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserAPIService from "src/service/api/userAPIService";

const { Search } = Input;

export const ChonNguoiDuyetKeHoach = (
    handleSendPlan
) => {
    const open = useSelector(state => state.modalChoosePerson.state);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);

    const handleOk = () => {
        dispatch({ type: "close_modal_choose_person" });
        handleSendPlan();
    };

    const handleCancel = () => {
        dispatch({ type: "close_modal_choose_person" });
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
                <Search placeholder="Tìm kiếm" onSearch={handleSearch} enterButton />
            </div>
            <div className="text-xl font-bold text-gray-800 mb-[5px]">
                Danh sách nhân viên
            </div>
            <div className="flex flex-col mb-[5px]">
                {userList.map(user => (
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
