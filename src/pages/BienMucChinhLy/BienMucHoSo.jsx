import { ENUM_STATE_FILE } from "src/storage/Storage";
import BasePage from "../BasePage";

const API_DOCUMENT_MODIFICATION_PLAN = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_PLAN

const BienMucHoSo = () => {
    const parent = [
        {
            title: "Biên mục chỉnh lý",
            link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
        },
    ];

    const current = {
        link: "/bien-muc-chinh-ly/bien-muc-ho-so",
        title: "Biên mục hồ sơ",
    };

    const filter = (files) => {
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.NOP_LUU_CO_QUAN)
                newFiles.push(file)
        }
        return newFiles
    }

    return (
        <BasePage
            parent={parent}
            current={current}
            addNewFile={true}
            filter={filter}
            apiPlan={API_DOCUMENT_MODIFICATION_PLAN}
            eOffice={false}
        />
    );
};

export default BienMucHoSo;
