export const DEPARTMENT = [
    { title: "Tên", key: "name", width: "100%" },
    { title: "Mã", key: "code", width: "100%" },
    { title: "Cơ quan", key: "organ", width: "100%" },
    //{ title: "Tổng nhân viên", key: "total_staff", width: "100%" },
    // { title: "Phân quyền", key: "permission", width: "100%" },
    { title: "", key: "update", width: "100%" },
]

export const STAFF = [
    { title: "Họ và tên", key: "name", width: "100%" },
    { title: "Email", key: "email", width: "100%" },
    { title: "Số điện thoại", key: "phone", width: "100%" },
    { title: "Cơ quan", key: "organ", width: "100%" },
    { title: "Phòng ban", key: "department", width: "100%" },
   // { title: "Vị trí", key: "position", width: "100%" },
    {title: "Chức vụ", key: "role", width: "100%"},
    // { title: "Trạng thái", key: "state", width: "100%" },
    { title: "", key: "update", width: "70px" },
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
    { type: "input", require: true, name: "organ", label: "Cơ quan", },
    { type: "input", require: true, name: "name", label: "Tên", },
    { type: "input", require: true, name: "code", label: "Mã", },
]

export const DEPARTMENT_DECENTRALIZATION_COLLASPE = [
    {
        type: "checkbox", require: true, name: "organ", label: "Cơ quan", permission: [
            { label: "Tạo cơ quan", value: "coquan_create" },
            { label: "Xem cơ quan", value: "coquan_read" },
            { label: "Chỉnh sửa cơ quan", value: "coquan_update" },
            { label: "Xóa cơ quan", value: "coquan_delete" },
        ]
    },
    {
        type: "checkbox", require: true, name: "department", label: "Phòng ban", permission: [
            { label: "Tạo phòng ban", value: "phongban_create" },
            { label: "Xem phòng ban", value: "phongban_read" },
            { label: "Chỉnh sửa phòng ban", value: "phongban_update" },
            { label: "Xóa phòng ban", value: "phongban_delete" },
        ]
    },
    {
        type: "checkbox", require: true, name: "staff", label: "Nhân viên", permission: [
            { label: "Tạo nhân viên", value: "nhanvien_create" },
            { label: "Xem nhân viên", value: "nhanvien_read" },
            { label: "Chỉnh sửa nhân viên", value: "nhanvien_update" },
            { label: "Xóa nhân viên", value: "nhanvien_delete" },
        ]
    },
    {
        type: "checkbox", require: true, name: "warehouse", label: "Kho", permission: [
            { label: "Tạo kho", value: "kho_create" },
            { label: "Xem kho", value: "kho_read" },
            { label: "Chỉnh sửa kho", value: "kho_update" },
            { label: "Xóa kho", value: "kho_delete" },
        ]
    },
    {
        type: "checkbox", require: true, name: "file", label: "Hồ sơ", permission: [
            { label: "Tạo hồ sơ", value: "hoso_create" },
            { label: "Xem hồ sơ", value: "hoso_read" },
            { label: "Chỉnh sửa hồ sơ", value: "hoso_update" },
            { label: "Xóa hồ sơ", value: "hoso_delete" },
            { label: "Thay đổi trạng thái hồ sơ", value: "hoso_changestate" },
        ]
    }
]

// "email": "tqvinh@gmail.com",
//     "username": "tqvinh",
//     "password": "admintl97p1",
//     "full_name": "Truong Quoc Vinh",
//     "phone": "0987654321", 
//     "is_staff": false,
//     "menu_permission": "",
//     "department": "2",
//     "role": 1

export const STAFF_DECENTRALIZATION = [
    { type: "text", require: true, name: "full_name", label: "Họ và tên" },
    { type: "text", require: true, name: "username", label: "Tên người dùng" },
    { type: "email", require: true, name: "email", label: "Email" },
    { type: "password", require: true, name: "password", label: "Mật khẩu" },
    { type: "text", require: true, name: "phone", label: "Số điện thoại" },
    { type: "checkbox", require: false, name: "is_staff", label: "Quản trị viên" },
    { type: "select", require: true, name: "department", label: "Phòng ban" },
    { type: "select", require: false, name: "role", label: "Chức vụ" },
    { type: "list_checkbox", require: true, name: "menu_permission", label: "Menu được phép truy cập" },
    { type: "select", require: false, name: "action", label: "Nhóm hành động" },
]

export const ORGAN_DECENTRALIZATION_INPUTS = [
    { type: "text", require: true, name: "name", label: "Tên" },
    { type: "text", require: true, name: "code", label: "Mã" },
    { type: "text", require: true, name: "address", label: "Địa chỉ" },
    { type: "number", require: false, name: "phone", label: "Số điện thoại" },
    { type: "number", require: false, name: "fax", label: "Fax" },
    { type: "select", require: true, name: "province", label: "Tỉnh thành" },
    { type: "select", require: true, name: "district", label: "Quận huyện" },
    { type: "select", require: false, name: "ward", label: "Phường xã" },
    { type: "switch", require: false, false: "storage", label: "Trung tâm lưu trữ lịch sử" },
    { type: "textarea", require: false, false: "note", label: "Ghi chú" },
]
