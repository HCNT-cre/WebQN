/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";

const Duyetchinhly = () => {
    const parent = [
        { title: "Biên mục chỉnh lý", link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly" },
    ]

    const current = {
        link: "/duyet-chinh-ly",
        title: "Duyệt chỉnh lý"
    }

    const filter = (files) => {
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === "Nộp lưu cơ quan")
                newFiles.push(file)
        }
        return newFiles
    }


    return <BasePage parent={parent} 
    current={current} filter={filter} 
    isCheckBox={false} 
    buttonFuctions={<ButtonFuctions />} 
    eOffice={false}/>
}

export default Duyetchinhly;
