import BasePage from "../BasePage";

const ThuThapHoSo = () => {
    const parent = [
        {
            title: "Thu thập và nộp lưu",
            link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap",
        },
    ];

    const current = {
        link: "/thu-thap-va-nop-luu/thu-thap-ho-so",
        title: "Thu thập hồ sơ",
    };

    const filter = (files) => {
        const newFiles = [];
        for (const file of files) {
            if (
                file.state.props.children !== "Đóng" &&
                file.state.props.children !== "Mở"
            )
                continue;
            newFiles.push(file);
        }

        return newFiles;
    };

    return (
        <BasePage
            parent={parent}
            current={current}
            addNewFile={true}
            filter={filter}
            eOffice={false}
        />
    );
};

export default ThuThapHoSo;
