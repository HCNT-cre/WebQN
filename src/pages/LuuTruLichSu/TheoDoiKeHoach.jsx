import BasePage from "../BasePage";
import { ENUM_STATE_FILE, ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";

const filterPlan = (file) => {
    return (file.type == ENUM_TYPE_PLAN.NOP_LUU_LICH_SU && (file.state == ENUM_STATE_PLAN.DOI_THU_THAP || file.state == ENUM_STATE_PLAN.DA_THU_THAP))
}

const FIELDS_TABLE = [
    { title: "Tên kế hoạch", key: "plan_name", width: "150%" },
    { title: "Tên cơ quan", key: "organ_name", width: "100%" },
    { title: "Trạng thái", key: "progress", width: "100%" },
]

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

    return <BasePage
        filtePlanCondition={filterPlan}
        thamDinhHoSo={true}
        parent={parent}
        current={current}
        isCheckBox={false}
        haveActionButton={false} 
        filterOrganByPlan={true}
        fieldsTableCustom={FIELDS_TABLE}
        />
}

export default TheoDoiKeHoach;
