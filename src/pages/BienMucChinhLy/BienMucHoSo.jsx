import BasePage from "../BasePage";

const BienMucHoSo = () => {
    const parent = [
        {
            title: "Biên mục hồ sơ",
            link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
        },
    ];

    const current = {
        link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
        title: "Biên mục hồ sơ",
    };

    return (
        <BasePage
            parent={parent}
            current={current}
            addNewFile={true}
        />
    );
};

export default BienMucHoSo;
