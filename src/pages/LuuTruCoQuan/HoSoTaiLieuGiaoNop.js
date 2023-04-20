import BasePage from "../BasePage";

const HoSoTaiLieuGiaoNop = ()=>{
    const parent = [
        {title: "Lưu trữ cơ quan", link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop"},
    ]

    const current = {
        link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop",
        title: "Hồ sơ tài liệu giao nộp"
    }

    return <BasePage parent={parent} current={current}/>
}

export default HoSoTaiLieuGiaoNop;