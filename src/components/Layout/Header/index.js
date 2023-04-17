import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import * as userAction from '../../../actions/user'
import { GetKey } from "../../../custom/Function"

const USER_ROLES = ["Nhân viên nhập liệu", "Người duyệt đơn"]

const Header = ({ sideBarWidth, setSideBarWidth }) => {

    const userRole = useSelector(state => state.user.role)
    const dispatch = useDispatch()
    const [stateBoxUserRole, setStateBoxUserRole] = useState(false)

    return (
        <>
            <div className={`z-50 flex justify-between px-[16px] transition-all ${sideBarWidth === 250 ? "ml-[250px] w-[calc(100%-250px)]" : "ml-[80px] w-[calc(100%-80px)]"} fixed h-[60px] bg-blue-300 top-0`}>
                <div className="flex justify-between items-center">
                    <button className="mr-[20px] text-[25px] font-bold text-black cursor-pointer toggle-side-bar-button" onClick={() => {
                        sideBarWidth === 250 ? setSideBarWidth(50) : setSideBarWidth(250)
                    }}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <p className="font-bold text-black text-[16px]">ISTORAGE - HỆ THỐNG QUẢN LÝ TÀI LIỆU LƯU TRỮ ĐIỆN TỬ TỈNH QUẢNG NGÃI</p>
                </div>
                <div onClick={() => setStateBoxUserRole(!stateBoxUserRole)} className="flex justify-between items-center cursor-pointer relative select-none">
                    <div className="mr-[8px] flex items-center rounded-[50%] justify-center w-[36px] h-[36px] bg-lime-100 border-amber-500 border-[0.5px] text-black">
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <p className="text-black font-medium ">
                        {userRole}
                    </p>

                    {
                        stateBoxUserRole &&
                        <div className="text-center absolute top-[45px] w-[calc(100%-36px)] bg-white rounded-[8px] p-[8px] mt-[8px] text-[12px] cursor-pointer border-solid border-[1px] border-[#ccc] shadow-sm ml-[36px]">
                            {
                                USER_ROLES.filter(role => role !== userRole).map((role, index) => {
                                    return (
                                        <div key={GetKey()} className="" onClick={() => {
                                            if (role === "Nhân viên nhập liệu") {
                                                dispatch(userAction.setRoleToApplicant())
                                            }
                                            else if (role === "Người duyệt đơn") {
                                                dispatch(userAction.setRoleToApplicationReviewer())
                                            }
                                        }}>
                                            {role}
                                        </div>
                                    )

                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Header