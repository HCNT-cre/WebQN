import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import QuocHuy from '../../../assets/img/QuocHuy.png'
import Expand from "react-expand-animated"
import { TABS_SIDEBAR } from "../../../storage/Storage"

const SideBar = ({ sideBarWidth }) => {
    const locaiton = useLocation()
    const transitions = ["height"];
    const [sidebarTabs, setSidebarTabs] = useState(TABS_SIDEBAR)

    const toggleExpand = (idx) => {
        const cur = sidebarTabs.map((tab, index) => {
            if (index === idx)
                return { ...tab, isExpand: !tab['isExpand'] }
            return tab
        })
        setSidebarTabs(cur)
    }
    const [currentTab, setCurrentTab] = useState(sidebarTabs.findIndex((tab) => {
        return tab.to === locaiton.pathname.toLocaleLowerCase();
    }))

    return (
        <>
            <div className={`overflow-scroll overflow-x-hidden transition-all ${sideBarWidth === 250 ? "w-[250px]" : "w-[80px]"} fixed left-0 top-0 shadow h-full bg-[#dcdcdc] pb-[20px]`}>
                <Link to='/' className={`${sideBarWidth === 250 ? 'mx-[16px]' : 'mx-[8px]'} border-[#b7b7b7] flex justify-center my-[16px] pb-[8px] border-b-[2px] border-solid `}>
                    <img className="w-[70px]" alt="Quoc Huy" src={QuocHuy} />
                </Link>

                {sidebarTabs.map((tab, idx) => {
                    return (
                        <Link to={tab.to} onClick={() => { setCurrentTab(idx) }} key={idx} className={`
                        block ${sideBarWidth === 250 ? 'sidebar-items--large ' : 'sidebar-items--small '} 
                        `}>
                            <div className={`${sideBarWidth !== 250 ? "justify-center" : ""} hover:bg-[#b9b9b9] rounded-[8px] flex relative ${idx === currentTab ? "sidebar-items--active" : ""}`} onClick={() => toggleExpand(idx)}>
                                <div className="mx-[10px] w-[16px]">
                                    <span dangerouslySetInnerHTML={{ __html: tab.icon }} />
                                </div>
                                {sideBarWidth === 250 && <p>{tab.title}</p>}
                                {tab.numChildTabs > 1 && sideBarWidth === 250 &&
                                    <span className="absolute right-[8px] top-0">
                                        {tab.isExpand === false ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
                                    </span>

                                }
                            </div>
                            {sideBarWidth === 250 &&
                                <Expand open={tab.isExpand} duration={200} transitions={transitions}>
                                    {tab.numChildTabs > 1 &&
                                        <div className="flex ml-[30px] flex-col">
                                            {tab.childTabs.map((child, index) => {
                                                return (
                                                    <Link key={index} className="text-[14px] px-[8px] hover:bg-[#b9b9b9] rounded-[8px] block mt-[8px]" to={child.to} >
                                                        {sideBarWidth === 250 && <span>{child.title}</span>}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    }
                                </Expand>
                            }
                        </Link>
                    )
                })
                }
            </div>
        </>
    )
}

export default SideBar