import BasePage from "../BasePage";

const HoSoDaNhanNopLuu = () => {
    const parent = [
        { title: "Thu thập và nộp lưu", link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap" },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/ho-so-da-nhan-nop-luu",
        title: "Hồ sơ đã nhận nộp lưu"
    }

    return <BasePage parent={parent} current={current} addNewFile={true} />
}

export default HoSoDaNhanNopLuu;