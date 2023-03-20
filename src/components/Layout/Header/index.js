const Header = () => {
    return (
        <>
            <div className="flex justify-between px-[16px] w-full fixed h-[60px] bg-blue-800 top-0">
                <div className="">
                    <button>
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <p className="text-white text-[16px]">HỆ THỐNG QUẢN LÝ TÀI LIỆU LƯU TRỮ ĐIỆN TỬ TỈNH QUÃNG NGÃI</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="mr-[8px] flex items-center rounded-[50%] justify-center w-[40px] h-[40px] bg-white">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    Admin
                </div>
            </div>
        </>
    )
}

export default Header