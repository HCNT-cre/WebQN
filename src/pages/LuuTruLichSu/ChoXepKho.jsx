/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "../BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";
import {ENUM_STATE_FILE, ENUM_STATE_PLAN} from "src/storage/Storage";

const parent = [
    { title: "Lưu trữ lịch sử",
    },
]

const current = {
    link: "/luu-tru-lich-su/cho-xep-kho",
    title: "Hồ sơ tài liệu giao nộp (chờ xếp kho)"
}

const ChoXepKho = () => {

    const filter = (files) => {
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.CHO_XEP_KHO_NOP_LUU_LICH_SU)
                newFiles.push(file)
        }
        return newFiles
    }

    const filterFileExcel = (files) => {
        if(files && files.length > 0) {
            return files.filter((file) => {
                return file.state == 19
            })
        }
        return []
    }

    const filtePlanCondition = (plan) => {
        return plan.state == ENUM_STATE_PLAN.CHO_XEP_KHO_NOP_LUU_LICH_SU
    }

    return <BasePage
        filtePlanCondition={filtePlanCondition}
        parent={parent}
        current={current}
        filter={filter}
        isCheckBox={false}
        buttonFuctions={<ButtonFuctions />}
        currentStateModal={ENUM_STATE_FILE.CHO_XEP_KHO_NOP_LUU_LICH_SU}
        filterFileExcel={filterFileExcel}
        eOffice={false} />
}

export default ChoXepKho;
