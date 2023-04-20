import BasePage from "../BasePage";

const HoSoTaiLieuGiaoNopLS = ()=>{
    const parent = [
        {title: "Lưu trữ lịch sử", link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop"},
    ]

    const current = {
        link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop",
        title: "Hồ sơ tài liệu giao nộp"
    }

    return <BasePage parent={parent} current={current}/>
}

export default HoSoTaiLieuGiaoNopLS;