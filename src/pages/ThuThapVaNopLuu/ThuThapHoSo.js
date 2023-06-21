import BasePage from "../BasePage";

const ThuThapHoSo = () => {
    const parent = [
        { title: "Thu thập và nộp lưu", link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap" },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/thu-thap-ho-so",
        title: "Thu thập hồ sơ"
    }

    return <BasePage parent={parent} current={current} addNewFile={true} />
}

export default ThuThapHoSo;