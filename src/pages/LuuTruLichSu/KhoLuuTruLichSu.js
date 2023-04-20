import BasePage from "../BasePage";

const KhoLuuTruLichSu = ()=>{
    const parent = [
        {title: "Lưu trữ lịch sử", link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop"},
    ]

    const current = {
        link: "/luu-tru-lich-su/kho-luu-tru-lich-su",
        title: "Kho lưu trữ lịch sử"
    }

    return <BasePage parent={parent} current={current}/>
}

export default KhoLuuTruLichSu;