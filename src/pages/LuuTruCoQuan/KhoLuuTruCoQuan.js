import BasePage from "../BasePage";

const KhoLuuTruCoQuan = ()=>{
    const parent = [
        {title: "Lưu trữ cơ quan", link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop"},
    ]

    const current = {
        link: "/luu-tru-co-quan/kho-luu-tru-co-quan",
        title: "Kho lưu trữ cơ quan"
    }

    return <BasePage parent={parent} current={current}/>
}

export default KhoLuuTruCoQuan;