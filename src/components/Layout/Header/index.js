const Header = ({ sideBarWidth, setSideBarWidth }) => {
    console.log(sideBarWidth === 200);
    if (sideBarWidth === undefined)
        sideBarWidth = 0

    return (
        <>
            <div className={`flex justify-between px-[16px] transition-all ${sideBarWidth === 200 ? "ml-[200px] w-[calc(100%-200px)]" : "ml-[50px] w-[calc(100%-50px)]"} fixed h-[60px] bg-blue-800 top-0`}>
                <div className="flex justify-between items-center">
                    <button className="mr-[8px] text-white cursor-pointer" onClick={() => 
                    {
                        sideBarWidth === 200 ? setSideBarWidth(50) : setSideBarWidth(200)
                    }}>
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <p className="font-medium text-white text-[16px]">HỆ THỐNG QUẢN LÝ TÀI LIỆU LƯU TRỮ ĐIỆN TỬ TỈNH QUÃNG NGÃI</p>
                </div>
                <div className="flex justify-between items-center cursor-pointer">
                    <div className="mr-[8px] flex items-center rounded-[50%] justify-center w-[36px] h-[36px] bg-white">
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <p className="text-white">
                        Admin
                    </p>
                </div>
            </div>
        </>
    )
}

export default Header