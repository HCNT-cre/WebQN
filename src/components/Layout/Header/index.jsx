import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import * as userAction from '../../../actions/user'
import { GetKey } from "../../../custom/Function"
const USER_ROLES = ["Nhân viên nhập liệu", "Người duyệt đơn"]
const userName = {
    0: "Admin",
    1: "Cường",
    2: "Lương",
    3: "Hiếu"
}

const Header = ({ sideBarWidth, setSideBarWidth }) => {

    const dispatch = useDispatch()
    const userRole = useSelector(state => state.user.role)
    const p = useSelector(state => state.userPermission)
    const userID = localStorage.getItem("userID")
    const [stateBoxUserRole, setStateBoxUserRole] = useState(false)
    const handleLogOut = () =>{
        dispatch({type: "LOGOUT"})
    }

    return (
        <>
            <div className={`z-50 flex justify-between px-[16px] transition-all ${sideBarWidth === 250 ? "ml-[290px] w-[calc(99%-285px)]" : "ml-[90px] w-[calc(99%-85px)]"} h-[75px]  mt-[8px] border-[2px] border-blue-700 rounded-md bg-blue-300 top-0`}>
                <div className="flex justify-between items-center">
                    <button className="mr-[20px] text-[25px] font-bold text-black cursor-pointer toggle-side-bar-button" onClick={() => {
                        sideBarWidth === 250 ? setSideBarWidth(50) : setSideBarWidth(250)
                    }}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <p className="font-bold text-black text-[16px]">ISTORAGE - HỆ THỐNG QUẢN LÝ TÀI LIỆU LƯU TRỮ ĐIỆN TỬ TỈNH QUẢNG NGÃI</p>
                </div>
                <div onClick={() => setStateBoxUserRole(!stateBoxUserRole)} className="flex justify-between items-center cursor-pointer relative select-none min-w-[150px]">
                    <div className="mr-[8px] flex items-center rounded-[50%] justify-center w-[36px] h-[36px] bg-lime-100 border-amber-500 border-[0.5px] text-black">
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <p className="text-black font-medium w-[calc(100%-36px)] text-center">
                        {userName[userID]   }
                    </p>

                    {
                        stateBoxUserRole &&
                        <div className="absolute top-[50px] w-[calc(100%-36px)]">
                           {/* <div className="text-center w-full  bg-white font-medium rounded-[8px] p-[8px] mt-[8px] text-[12px] cursor-pointer border-solid border-[1px]  hover:bg-blue-700 hover:text-white border-[#ccc] shadow-sm ml-[36px]">
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
                            */}
                            <div onClick={handleLogOut} className="text-center w-full font-medium text-black bg-white rounded-[8px] p-[8px] text-[12px] cursor-pointer border-solid border-[1px] border-[#ccc] shadow-sm ml-[36px] hover:bg-blue-700 hover:text-white">Đăng xuất</div>
                        </div>

                    }
                </div>
            </div>
        </>
    )
}

export default Header
