import BasePage from "../BasePage";
import { ENUM_STATE_FILE, ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";

const filterPlan = (file) => {
    return (file.type === ENUM_TYPE_PLAN.NOP_LUU_LICH_SU && file.state === ENUM_STATE_PLAN.DOI_THU_THAP && file.state === ENUM_STATE_PLAN.DA_THU_THAP)
}


const TheoDoiKeHoach = () => {
    const parent = [
        {
            title: "Lưu trữ lịch sử",
            //  link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop" 
        },
    ]

    const current = {
        link: "/luu-tru-lich-su/theo-doi-ke-hoach-nop-luu-lich-su",
        title: "Theo dõi kế hoạch nộp lưu lịch sử"
    }

    const filter = (files) => {
        const newFiles = []

        let today = new Date()
        const y = today.getFullYear();
        const m = today.getMonth() + 1; // Months start at 0!
        const d = today.getDate();

        today = new Date(`${y}-${m}-${d}`)

        for (const file of files) {
            if (file.state.props.children !== ENUM_STATE_FILE.NOP_LUU_LICH_SU) continue;
            // if (file.maintenance_name !== "Vĩnh viễn") continue;
            // if (file.end_date === null || file.end_date === undefined || (file.state.props.children !== 'Nộp lưu lịch sử' || file.maintenance !== "Vĩnh viễn"))
            //     continue
            // if (dateDiff(file.end_date) >= 10)
            newFiles.push(file)
        }

        return newFiles
    }


    return <BasePage
        filtePlanCondition={filterPlan}
        thamDinhHoSo={true}
        parent={parent}
        current={current}
        filter={filter}
        isCheckBox={false}
        haveActionButton={false} />
}

export default TheoDoiKeHoach;
