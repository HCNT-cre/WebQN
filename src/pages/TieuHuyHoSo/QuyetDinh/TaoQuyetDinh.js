import BasePage from "pages/TieuHuyHoSo/QuyetDinh/Base";

const TaoQuyetDinh = () => {
    const parent =
        { title: "Tiêu hủy hồ sơ", link: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh" }

    const current = {
        link: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh",
        title: "Tạo quyết định"
    }


    return <BasePage
        parent={parent}
        current={current}
    />
}

export default TaoQuyetDinh;