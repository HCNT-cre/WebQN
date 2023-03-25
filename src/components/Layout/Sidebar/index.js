import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import QuocHuy from '../../../assets/img/QuocHuy.png'

const SideBar = ({ sideBarWidth }) => {
    const locaiton = useLocation()

    const tabs = [
        { title: "Trang chủ", to: "/" },
        { title: "Thêm hồ sơ", to: "/them-ho-so" },
    ]

    const [currentTab, setCurrentTab] = useState(tabs.findIndex((tab) => {
        return tab.to === locaiton.pathname.toLocaleLowerCase();
    }))

    return (
        <>

            <div className={`${sideBarWidth === 300 ? "w-[300px]" : "w-[80px]"} transition-all fixed left-0 top-0  shadow h-full bg-[#dcdcdc]`}>
                <div className={`${sideBarWidth === 300 ? 'mx-[24px]' : 'mx-[8px]'} border-[#b7b7b7] flex justify-center my-[16px] pb-[8px] border-b-[2px] border-solid `}>
                    <img className="w-[70px]" alt="Quoc Huy" src={QuocHuy} />
                </div>

                {tabs.map((tab, idx) => {
                    return (
                        <Link to={tab.to} onClick={() => { setCurrentTab(idx) }} key={idx} className={`${sideBarWidth === 300 ? 'sidebar-items--large ' : 'sidebar-items--small '} ${idx === currentTab ? "sidebar-items--active" : ""}`}>
                            <div className="mx-[24px]"><i class="fa-solid fa-house"></i></div>
                            {sideBarWidth === 300 && <span>{tab.title}</span>}
                        </Link>
                    )
                })
                }

            </div>
        </>
    )
}

export default SideBar