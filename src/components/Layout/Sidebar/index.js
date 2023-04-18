import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import QuocHuy from '../../../assets/img/QuocHuy.png'
import Expand from "react-expand-animated"
import { TABS_SIDEBAR } from "../../../storage/Storage"

const ChildTabs = ({tab, setCurrentTab, currentTab}) => {
    const transitions = ["height"];
    const children = []

    for (let i = 0; i < tab.numChildTabs; i++) {
        const childTab = tab.childTabs[i]
        if (childTab.numChildTabs > 0) {
            children.push(<ChildTabs tab={childTab} />)
        }
        else
            children.push(
                <Link onClick={() => { setCurrentTab(prev => childTab.key) }} to={childTab.to} key={childTab.key} className={`flex items-center text-[#b7b7b7] hover:text-white py-[8px] px-[16px] text-[14px] ${childTab.key === currentTab ? "sidebar-items--active" : ""}`} >
                    {childTab.title}
                </Link>)
    }
    return (
        <Expand open={tab.isExpand} duration={200} transitions={transitions}>
            {children}
        </Expand>
    )
}



const SideBar = ({ sideBarWidth }) => {
    const locaiton = useLocation()
    const [sidebarTabs, setSidebarTabs] = useState(TABS_SIDEBAR)

    const toggleExpand = (idx) => {
        const cur = sidebarTabs.map((tab, index) => {
            if (index === idx)
                return { ...tab, isExpand: !tab['isExpand'] }
            return tab
        })
        setSidebarTabs(cur)
    }


    const [currentTab, setCurrentTab] = useState(locaiton.pathname.toLocaleLowerCase())
    console.log(currentTab)
    return (
        <>
            <div className={`overflow-auto overflow-x-hidden transition-all duration-300 ${sideBarWidth === 250 ? "w-[250px]" : "w-[80px]"} fixed left-0 top-0 shadow h-full bg-[#302f2ff4] pb-[20px]`}>

                <Link to='/' className={`${sideBarWidth === 250 ? 'mx-[16px]' : 'mx-[8px]'} border-[#b7b7b7] flex justify-center my-[16px] pb-[32px] border-b-[2px] border-solid `}>
                    <img className="w-[70px]" alt="Quoc Huy" src={QuocHuy} />
                </Link>

                {sidebarTabs.map((tab, idx) => {
                    return (
                        <Link to={tab.to} onClick={() => { setCurrentTab(tab.key) }} key={tab.key} className={`
                        block ${sideBarWidth === 250 ? 'sidebar-items--large ' : 'sidebar-items--small '} 
                        `}>
                            <div className={`${sideBarWidth !== 250 ? "justify-center" : ""} hover:bg-[#aaaaaa25] border-[1.5px] border-transparent hover:border-cyan-400 rounded-[8px] flex relative ${tab.key === currentTab ? "sidebar-items--active" : ""}`} onClick={() => toggleExpand(idx)}>
                                <div className="mx-[10px] w-[16px]">
                                    <span dangerouslySetInnerHTML={{ __html: tab.icon }} />
                                </div>

                                {sideBarWidth === 250 && <p>{tab.title}</p>}
                                {tab.numChildTabs > 0 && sideBarWidth === 250 &&
                                    <span className="absolute right-[8px] top-0">
                                        {tab.isExpand === false ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
                                    </span>

                                }

                            </div>

                            {sideBarWidth === 250 && tab.numChildTabs > 0 &&
                                <ChildTabs tab={tab} setCurrentTab={setCurrentTab} currentTab={currentTab} />
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