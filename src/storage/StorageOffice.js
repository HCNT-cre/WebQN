export const DEPARTMENT = [
    { title: "Tên", key: "name", width: "100%" },
    { title: "Mã", key: "code", width: "100%" },
    { title: "Cơ quan", key: "organ", width: "100%" },
    { title: "Tổng nhân viên", key: "total_staff", width: "100%" },
    { title: "Phân quyền", key: "decentralization", width: "100%" },
    { title: "", key: "update", width: "100%" },
]

export const STAFF = [
    { title: "Tên", key: "name", width: "100%" },
    { title: "Email", key: "email", width: "100%" },
    { title: "Địa chỉ", key: "address", width: "100%" },
    { title: "Số điện thoại", key: "phone", width: "100%" },
    { title: "Cơ quan", key: "organ", width: "100%" },
    { title: "Phòng ban", key: "department", width: "100%" },
    { title: "Vị trí", key: "position", width: "100%" },
    { title: "Trạng thái", key: "state", width: "100%" },
    { title: "", key: "update", width: "100%" },
]

export const ORGAN = [
    { title: "Tên", key: "name", width: "100%" },
    { title: "Mã", key: "code", width: "100%" },
    { title: "Địa chỉ", key: "address", width: "100%" },
    { title: "Số điện thoại", key: "phone", width: "100%" },
    { title: "Fax", key: "fax", width: "100%" },
    { title: "Tỉnh thành", key: "provinceName", width: "100%" },
    { title: "Quận huyện", key: "districtName", width: "100%" },
    { title: "Phường xã", key: "wardName", width: "100%" },
    { title: "", key: "update", width: "100%" }
]
export const DEPARTMENT_DECENTRALIZATION_INPUTS = [
    { type: "input", require: true, name: "name", label: "Tên", },
    { type: "input", require: true, name: "code", label: "Mã", },
    { type: "select", require: true, name: "organ", label: "Cơ quan", },
]

export const DEPARTMENT_DECENTRALIZATION_COLLASPE = [
    {
        type: "checkbox", require: true, name: "organ", label: "Cơ quan", permission: [
            { label: "Admin cơ quan", value: "admin-organ" },
            { label: "Xem cơ quan", value: "watch-organ" },
            { label: "Chỉnh sửa cơ quan", value: "update-organ" },
            { label: "Xóa cơ quan", value: "delete-organ" },
        ]
    },
    {
        type: "checkbox", require: true, name: "department", label: "Phòng ban", permission: [
            { label: "Admin phòng ban", value: "admin-department" },
            { label: "Xem phòng ban", value: "watch-department" },
            { label: "Chỉnh sửa phòng ban", value: "update-department" },
            { label: "Xóa phòng ban", value: "delete-department" },
        ]
    },
    {
        type: "checkbox", require: true, name: "staff", label: "Nhân viên", permission: [
            { label: "Admin nhân viên", value: "admin-staff" },
            { label: "Xem nhân viên", value: "watch-staff" },
            { label: "Chỉnh sửa nhân viên", value: "update-staff" },
            { label: "Xóa nhân viên", value: "delete-staff" },
        ]
    },
    {
        type: "checkbox", require: true, name: "warehouse", label: "Kho", permission: [
            { label: "Admin kho", value: "admin-warehouse" },
            { label: "Xem kho", value: "watch-warehouse" },
            { label: "Chỉnh sửa kho", value: "update-warehouse" },
            { label: "Xóa kho", value: "delete-warehouse" },
        ]
    },
    {
        type: "checkbox", require: true, name: "file", label: "Hồ sơ", permission: [
            { label: "Admin hồ sơ", value: "admin-file" },
            { label: "Xem hồ sơ", value: "watch-file" },
            { label: "Chỉnh sửa hồ sơ", value: "update-file" },
            { label: "Xóa hồ sơ", value: "delete-file" },
            { label: "Thay đổi trạng thái hồ sơ", value: "change-state-file" },
        ]
    }
]

export const STAFF_DECENTRALIZATION = [
    { type:"input", require:true, name: "name", label: "Tên" },
    { type:"input", require:true, name: "email", label: "Email" },
    { type:"input", require:true, name: "password", label: "Mật khẩu" },
    { type:"input", require:true, name: "phone", label: "Số điện thoại" },
    { type:"input", require:true, name: "address", label: "Địa chỉ" },
    { type:"input", require:true, name: "position", label: "Vị trí" },
    { type:"select", require:true, name: "department", label: "Phòng ban" },
]

export const ORGAN_DECENTRALIZATION_INPUTS = [
    { type: "text", require: true, name: "name", label: "Tên" },
    { type: "text", require: true, name: "code", label: "Mã" },
    { type: "text", require: true, name: "address", label: "Địa chỉ" },
    { type: "number", require: false, name: "phone", label: "Số điện thoại" },
    { type: "number", require: false, name: "fax", label: "Fax" },
    { type: "select", require: true, name: "province", label: "Tỉnh thành" },
    { type: "select", require: true, name: "district", label: "Quận huyện" },
    { type: "select", require: true, name: "ward", label: "Phường xã" },
    { type: "switch", require: false, false: "storage", label: "Trung tâm lưu trữ lịch sử" },
    { type: "textarea", require: false, false: "note", label: "Ghi chú" },
    
]