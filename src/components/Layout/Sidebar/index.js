import { useState } from "react"
import { Link } from "react-router-dom"
const SideBar = ({ sideBarWidth }) => {

    const [currentTab, setCurrentTab] = useState(-1)
    
    const tabs = [
        {title: "Trang chủ", to: "/"},
        {title: "Thêm hồ sơ", to: "/them-ho-so"},
    ]

    return (
        <>
            <div className={`${sideBarWidth === 200 ? "w-[300px]" : "w-[50px]"} transition-all fixed left-0 top-0 pt-[60px] shadow h-full bg-[#dcdcdc]`}>
     
                    {tabs.map((tab, idx) => {
                        return (
                            <Link to={tab.to} onClick={()=>{setCurrentTab(idx)}} key={idx} className={`sidebar-items ${idx === currentTab ? "sidebar-items--active" : ""}`}>
                                <div className="mx-[24px]"><i class="fa-solid fa-house"></i></div>
                                {sideBarWidth === 200 && <span>{tab.title}</span>}
                            </Link>
                        )
                    })
                    }
             
            </div>
        </>
    )
}

export default SideBar