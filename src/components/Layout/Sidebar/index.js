import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import QuocHuy from '../../../assets/img/QuocHuy.png'
import Expand from "react-expand-animated"
const SideBar = ({ sideBarWidth }) => {
    const locaiton = useLocation()
    const transitions = ["height"];

    const [sidebarTabs, setSidebarTabs] = useState([
        { isExpand: false, icon: `<i class="fa-solid fa-house"></i>`, title: "Trang chủ", to: "/", numChildTabs: 1 },
        {
            isExpand: false, icon: '<i class="fa-regular fa-file"></i>',
            title: "Hồ sơ tài liệu", numChildTabs: 3, childTabs: [
                { title: "Danh sách hồ sơ tài liệu", to: "/ho-so/tao-ho-so-dien-tu" },
                { title: "Số hóa hồ sơ tài liệu", to: "/ho-so/so-hoa-ho-so-tai-lieu" },
                { title: "HS đến hạn nộp lưu", to: "/ho-so/ho-so-den-han-nop-luu" }]
        },
        {
            isExpand: false, icon: '<i class="fa-regular fa-building"></i>',
            title: "Lưu trữ cơ quan", numChildTabs: 3, childTabs: [
                { title: "Hồ sơ tài liệu giao nộp", to: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop" },
                { title: "Kho lưu trữ cơ quan", to: "/luu-tru-co-quan/kho-luu-tru-co-quan" },
                { title: "HS đến hạn nộp lưu LS", to: "/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su" }
            ]
        },
        {
            isExpand: false, icon: '<i class="fa-solid fa-arrow-rotate-right"></i>',
            title: "Lưu trữ lịch sử", numChildTabs: 2, childTabs: [
                { title: "Hồ sơ tài liệu giao nộp", to: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop" },
                { title: "Kho lưu trữ lịch sử", to: "/luu-tru-lich-su/kho-luu-tru-lich-su" },
            ]
        },
        {
            isExpand: false, icon: '<i class="fa-solid fa-magnifying-glass"></i>', title: "Tra cứu và tìm kiếm", numChildTabs: 1, to: "/tra-cuu-va-tim-kiem"
        },
        {
            isExpand: false, icon: '<i class="fa-regular fa-newspaper"></i>', title: "Báo cáo và thống kê", numChildTabs: 1, to: "/bao-cao-va-thong-ke"
        },
        {
            isExpand: false, icon: '<i class="fa-solid fa-people-roof"></i>',
            title: "Quản lý hệ thống", numChildTabs: 2, childTabs: [
                { title: "Người dùng", to: "/quan-ly-he-thong/nguoi-dung" },
                { title: "Phân quyền hệ thống", to: "/quan-ly-he-thong/phan-quyen-he-thong" },
            ]
        },
    ])

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
                                        {tab.isExpand === false ? <i class="fa-solid fa-chevron-down"></i> : <i class="fa-solid fa-chevron-up"></i>}
                                    </span>

                                }
                            </div>
                            {sideBarWidth === 250 &&
                                <Expand open={tab.isExpand} duration={200} transitions={transitions}>
                                    {tab.numChildTabs > 1 &&
                                        <div className="flex ml-[30px] flex-col">
                                            {tab.childTabs.map((child, index) => {
                                                return (
                                                    <Link className="text-[14px] px-[8px] hover:bg-[#b9b9b9] rounded-[8px] block mt-[8px]" to={child.to} >
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