import { useState } from "react"
const SideBar = ({ sideBarWidth }) => {

    const [currentTab, setCurrentTab] = useState(-1)
    
    const tabs = [
        "Hồ sơ tài liêu",
        "Hồ sơ tài liêu",
        "Hồ sơ tài liêu",
        "Tai lieu",
        "Hồ sơ tài liêu",
        "Hồ sơ tài liêu",
        "Hồ sơ tài liêu"
    ]

    return (
        <>
            <div className={`${sideBarWidth === 200 ? "w-[200px]" : "w-[50px]"} transition-all fixed left-0 top-0 pt-[60px] shadow h-full my-[4px]`}>
                <ul>
                    {tabs.map((item, idx) => {
                        return (
                            <li onClick={()=>{setCurrentTab(idx)}} key={idx} className={`sidebar-items ${idx === currentTab ? "sidebar-items--active" : ""}`}>
                                <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                                {sideBarWidth === 200 && <span>{item}</span>}
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        </>
    )
}

export default SideBar