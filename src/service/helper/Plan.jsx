import { Button } from "antd"
import { useDispatch } from "react-redux";

export const AddWatchTheoDoiNopLuuLichSu = ({ item }) => {
    const dispatch = useDispatch();
    const handleClick = (id, name) => {
        dispatch({ type: "open_modal_confirm_send_plan_luu_tru_lich_su", id, name });
    };
    return (
        <div>
            <Button onClick={() => handleClick(item.id, item.name)} className="border-none">
                <i className="fa-solid fa-paper-plane"></i>
            </Button>
        </div>
    )
}
