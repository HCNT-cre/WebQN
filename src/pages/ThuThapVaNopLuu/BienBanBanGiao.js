import BasePage from "../BasePage";

const BienBanBanGiao = () => {
    const parent = [
        { title: "Thu thập và nộp lưu", link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap" },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/bien-ban-ban-giao",
        title: "Biên bản bàn giao"
    }

    return <BasePage parent={parent} current={current} addNewFile={true} />
}

export default BienBanBanGiao;