import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import QuocHuy from '../../../assets/img/QuocHuy.png';
import Expand from "react-expand-animated";
import { TABS_SIDEBAR } from "../../../storage/Storage";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const SideBarTab = ({ tab, sideBarWidth, currentTab, setCurrentTab, toggleExpand, permissions }) => {
    if (!tab) {
        return null;
    }

    return (
        <div>
            <Link to={tab.to} onClick={() => setCurrentTab(tab.key)} className={`
                block ${sideBarWidth === 250 ? 'sidebar-items--large ' : 'sidebar-items--small '} 
            `}>
                <div className={`${sideBarWidth !== 250 ? "justify-center" : ""} hover:bg-[#aaaaaa25] border-[1.5px] border-transparent hover:border-cyan-400 hover:text-white rounded-[8px] flex relative ${tab.key === currentTab ? "sidebar-items--active" : ""}`} onClick={() => toggleExpand(tab.key)}>
                    <div className="flex items-center mx-[10px] w-[16px]">
                        {tab.icon && <span dangerouslySetInnerHTML={{ __html: tab.icon }} />}
                    </div>

                    {sideBarWidth === 250 && <p className="whitespace-normal text-[12.5px]">{tab.title}</p>}

                    <div className="flex items-center mx-[10px] w-[16px]">
                        {tab.numChildTabs > 0 && sideBarWidth === 250 &&
                            <span className="absolute right-[8px]">
                                {tab.isExpand === false ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
                            </span>
                        }
                    </div>
                </div>
                {sideBarWidth === 250 && tab.numChildTabs > 0 &&
                    <Expand open={tab.isExpand} duration={200} transitions={["height"]}>
                        <div className="flex ml-[10px] flex-col">
                            {tab.childTabs.map((child) => (
                                <SideBarTab
                                    key={child.key}
                                    tab={child}
                                    sideBarWidth={sideBarWidth}
                                    currentTab={currentTab}
                                    setCurrentTab={setCurrentTab}
                                    toggleExpand={toggleExpand}
                                    permissions={permissions}
                                />
                            ))}
                        </div>
                    </Expand>
                }
            </Link>
        </div>
    );
};

const updateTabs = (tabs, key) => {
    return tabs.map((tab) => {
        if (tab.key === key) {
            return { ...tab, isExpand: !tab.isExpand };
        }
        if (tab.numChildTabs > 0) {
            const updatedChildTabs = updateTabs(tab.childTabs, key);
            return { ...tab, childTabs: updatedChildTabs };
        }
        return tab;
    });
}

const SideBar = ({ sideBarWidth }) => {
    const permissions = useSelector(state => state.userPermission);
    const location = useLocation();
    const [sidebarTabs, setSidebarTabs] = useState(TABS_SIDEBAR);
    const [currentTab, setCurrentTab] = useState(location.pathname.toLowerCase());

    const toggleExpand = (key) => {
        setSidebarTabs(updateTabs(sidebarTabs, key));
    };

    return (
        permissions === null ? <Spin /> :
            <>
                <div className={`overflow-auto overflow-x-hidden transition-all duration-300 ${sideBarWidth === 250 ? "w-[320px]" : "w-[80px]"} fixed left-0 top-0 shadow h-full bg-[#302f2ff4] pb-[20px]`}>
                    <Link to='/' className={`${sideBarWidth === 250 ? 'mx-[16px]' : 'mx-[8px]'} border-[#b7b7b7] flex justify-center my-[16px] pb-[32px] border-b-[2px] border-solid `}>
                        <img className="w-[70px]" alt="Quoc Huy" src={QuocHuy} />
                    </Link>
                    {sidebarTabs.map((tab) => {
                        return (
                            (tab.number == 0 || permissions.findIndex((permission) => permission == tab.number) >= 0 || permissions.length == 1) &&
                            <SideBarTab
                                key={tab.key}
                                tab={tab}
                                sideBarWidth={sideBarWidth}
                                currentTab={currentTab}
                                setCurrentTab={setCurrentTab}
                                toggleExpand={toggleExpand}
                                permissions={permissions}
                            />
                        );
                    })}
                </div>
            </>
    );
};

export default SideBar;
