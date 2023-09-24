/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";

const DuyetHoSoNopLuu = () => {
    const parent = [
        { title: "Lưu trữ cơ quan", link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop" },
    ]

    const current = {
        link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop",
        title: "Hồ sơ tài liệu giao nộp"
    }

    const filter = (files) => {
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === "Nộp lưu cơ quan")
                newFiles.push(file)
        }
        return newFiles
    }


    return <BasePage
        parent={parent}
        current={current}
        filter={filter}
        isCheckBox={false}
        buttonFuctions={<ButtonFuctions />}
        eOffice={false}
    />
}

export default DuyetHoSoNopLuu;
