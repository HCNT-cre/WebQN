import BasePage from "../BasePage";

const NopLuuCoQuan = () => {
    const parent = [
        { title: "Thu thập và nộp lưu", link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap" },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/nop-luu-co-quan",
        title: "Nộp lưu cơ quan"
    }

    return <BasePage parent={parent} current={current} addNewFile={true} />
}

export default NopLuuCoQuan;