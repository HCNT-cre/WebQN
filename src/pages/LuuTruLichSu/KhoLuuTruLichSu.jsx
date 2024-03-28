import BasePage from "../BasePage";
import { ENUM_STATE_FILE } from "src/storage/Storage";

export const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "150%" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id", width: "100%" },
    { title: "Vị trí lưu trữ", key: "drawer_name", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "Trạng thái", key: "state", width: "130%" },
    { title: "Chức năng", key: "Function", width: "120px" },
]


const KhoLuuTruLichSu = () => {
    const parent = [
        {
            title: "Lưu trữ lịch sử",

        },
    ]

    const current = {
        link: "/luu-tru-lich-su/kho-luu-tru-lich-su",
        title: "Kho lưu trữ lịch sử"
    }

    const filter = (files) => {
        const newFiles = []
        console.log(files)
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.LUU_TRU_LICH_SU)
                newFiles.push(file)
        }
        return newFiles
    }
    const filterFileExcel = (files) => {
        if (files && files.length > 0) {
            return files.filter((file) => {
                return file.state == 6
            })
        }
        return []
    }

    return <BasePage
        parent={parent}
        current={current}
        haveActionButton={false}
        filter={filter}
        filterFileExcel={filterFileExcel}
    />
}

export default KhoLuuTruLichSu;

