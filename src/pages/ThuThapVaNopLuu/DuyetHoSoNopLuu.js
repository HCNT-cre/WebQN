import BasePage from "../BasePage";

const DuyetHoSoNopLuu = () => {
    const parent = [
        { title: "Thu thập và nộp lưu", link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap" },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/duyet-ho-so-nop-luu",
        title: "Duyệt hồ sơ nộp lưu"
    }

    return <BasePage parent={parent} current={current} addNewFile={true} />
}

export default DuyetHoSoNopLuu;