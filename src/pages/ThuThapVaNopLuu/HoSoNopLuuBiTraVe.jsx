import BasePage from "../BasePage";

const HoSoNopLuuBiTraVe = () => {
    const parent = [
        { title: "Thu thập và nộp lưu",
          //link: "/thu-thap-va-nop-luu/thu-thap-ho-so"
         },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/ho-so-nop-luu-bi-tra-ve",
        title: "Hồ sơ bị trả về"
    }

    const filter = (files) => {

        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === "Nộp lưu cơ quan bị trả về") {
                newFiles.push(file)
            }
        }

        return newFiles
    }

    const filterFileExcel = (files) => {
        if(files && files.length > 0) {
            return files.filter((file) => {
                return file.state == 7
            })
        }
        return []
    }
    return <BasePage parent={parent} current={current} filter={filter} filterFileExcel={filterFileExcel}/>
}

export default HoSoNopLuuBiTraVe;
