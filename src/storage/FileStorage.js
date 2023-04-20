export const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "200px" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id", width: "100%" },
    { title: "Số lượng tờ", key: "sheet_number", width: "70px" },
    { title: "Số lượng văn bản", key: "TotalDoc", width: "70px" },
    { title: "Thời gian bắt đầu", key: "start_date", width: "100%" },
    { title: "Thời gian kết thúc", key: "end_date", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "Trạng thái", key: "state", width: "130%" },
    { title: "Chức năng", key: "Function", width: "120px" },
]

export const IDENTIFIER_CODE = {
    "Trung tâm lưu trữ lịch sử": "001.03.34.H48",
    "Sở giáo dục và đào tạo": "001.03.34.J09",
    "Sở thông tin và truyền thông": "001.09.34.K21",
    "UBND tỉnh Quảng Ngãi": "020.03.34.H01",
}

export const IDENTIFIER = [
    { label: "Trung tâm lưu trữ lịch sử" , value: "Trung tâm lưu trữ lịch sử"},
    { label: "Sở giáo dục và đào tạo", value: "Sở giáo dục và đào tạo" },
    { label: "Sở thông tin và truyền thông", value: "Sở thông tin và truyền thông" },
    { label: "UBND tỉnh Quảng Ngãi", value: "UBND tỉnh Quảng Ngãi" },
]

export const ORGAN_ID = [
    { label: "Phông trung tâm lưu trữ lịch sử" , value: "Phông trung tâm lưu trữ lịch sử"},
    { label: "Phông sở thông tin và truyền thông", value: "Phông sở thông tin và truyền thông" },
    { label: "Phông sở giáo dục và đào tạo", value: "Phông sở giáo dục và đào tạo" },
]

export const MAINTENANCE = [
    { label: "5 năm", value: "5 năm" },
    { label: "10 năm", value: "10 năm" },
    { label: "20 năm", value: "20 năm" },
    { label: "30 năm", value: "30 năm" },
    { label: "40 năm", value: "40 năm" },
    { label: "50 năm", value: "50 năm" },
    { label: "Vĩnh viễn", value: "60 năm" },
]

export const LANGUAGE = [
    { label: "Tiếng Việt", value: "Tiếng Việt" },
    { label: "Tiếng Anh", value: "Tiếng Anh" },
    { label: "Tiếng Trung", value: "Tiếng Trung" },
    { label: "Tiếng Pháp", value: "Tiếng Pháp" },
    { label: "Tiếng Nga", value: "Tiếng Nga" },
    { label: "Tiếng Nhật", value: "Tiếng Nhật" },
]

export const FORMAT = [
    { label: "Bình thường", value: "Bình thường" },
    { label: "Khó đọc", value: "Khó đọc" },
    { label: "Nhiều tài liệu thủng", value: "Nhiều tài liệu thủng" },
]

export const RIGHTS = [
    { value: "Công Khai", label: "Công Khai" },
    { value: "Không công khai", label: "Không công khai" },
    { value: "Riêng tư", label: "Riêng tư" },
]