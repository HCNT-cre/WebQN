import BasePage from "../BasePage";
const Decentralization = () => {
    const parent = [
        { title: "Quản lý hệ thống", link: "/quan-ly-he-thong/nguoi-dung" },
    ]

    const current = {
        link: "/quan-ly-he-thong/phan-quyen-he-thong",
        title: "Phân quyền hệ thống"
    }



    return <BasePage parent={parent} current={current} />
}

export default Decentralization;