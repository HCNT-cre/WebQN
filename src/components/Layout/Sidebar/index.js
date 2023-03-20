const SideBar = ({sideBarWidth}) => {
    console.log(sideBarWidth === 200);
    return (
        <>
            <div className={`${sideBarWidth === 200 ? "w-[200px]" : "w-[50px]"} fixed left-0 top-0 pt-[60px] shadow h-full my-[4px]`}>
                <ul>
                    <li className="sidebar-items">
                        <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                        <span>Hồ sơ tài liệu</span>
                    </li>
                    <li className="sidebar-items">
                        <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                        <span>Hồ sơ tài liệu</span>
                    </li>
                    <li className="sidebar-items">
                        <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                        <span>Hồ sơ tài liệu</span>
                    </li>
                    <li className="sidebar-items">
                        <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                        <span>Hồ sơ tài liệu</span>
                    </li>
                    <li className="sidebar-items">
                        <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                        <span>Hồ sơ tài liệu</span>
                    </li>
                    <li className="sidebar-items">
                        <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                        <span>Hồ sơ tài liệu</span>
                    </li>
                    <li className="sidebar-items">
                        <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                        <span>Hồ sơ tài liệu</span>
                    </li>
                    <li className="sidebar-items">
                        <div className="mr-[8px]"><i class="fa-solid fa-house"></i></div>
                        <span>Hồ sơ tài liệu</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SideBar