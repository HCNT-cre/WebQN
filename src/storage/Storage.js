export const STATE = [
    "Tất cả", "Mở", "Đóng", "Nộp lưu cơ quan", "Lưu trữ cơ quan", "Nộp lưu lịch sử", "Lưu trữ lịch sử"
]

export const TABS_SIDEBAR = [
    { isExpand: false, icon: `<i class="fa-solid fa-house"></i>`, title: "Trang chủ", to: "/", numChildTabs: 1 },
    {
        isExpand: false, icon: '<i class="fa-regular fa-file"></i>',
        title: "Hồ sơ tài liệu", numChildTabs: 3, childTabs: [
            { title: "Danh sách hồ sơ", to: "/ho-so/tao-ho-so-dien-tu" },
            { title: "Số hóa hồ sơ tài liệu", to: "/ho-so/so-hoa-ho-so-tai-lieu" },
            { title: "HS đến hạn nộp lưu", to: "/ho-so/ho-so-den-han-nop-luu" }]
    },
    {
        isExpand: false, icon: '<i class="fa-regular fa-building"></i>',
        title: "Lưu trữ cơ quan", numChildTabs: 3, childTabs: [
            { title: "Hồ sơ tài liệu giao nộp", to: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop" },
            { title: "Kho lưu trữ cơ quan", to: "/luu-tru-co-quan/kho-luu-tru-co-quan" },
            { title: "HS đến hạn nộp lưu LS", to: "/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su" }
        ]
    },
    {
        isExpand: false, icon: '<i class="fa-solid fa-arrow-rotate-right"></i>',
        title: "Lưu trữ lịch sử", numChildTabs: 2, childTabs: [
            { title: "Hồ sơ tài liệu giao nộp", to: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop" },
            { title: "Kho lưu trữ lịch sử", to: "/luu-tru-lich-su/kho-luu-tru-lich-su" },
        ]
    },
    {
        isExpand: false, icon: '<i class="fa-solid fa-magnifying-glass"></i>', title: "Tra cứu và tìm kiếm", numChildTabs: 1, to: "/tra-cuu-va-tim-kiem"
    },
    {
        isExpand: false, icon: '<i class="fa-regular fa-newspaper"></i>', title: "Báo cáo và thống kê", numChildTabs: 1, to: "/bao-cao-va-thong-ke"
    },
    {
        isExpand: false, icon: '<i class="fa-solid fa-people-roof"></i>',
        title: "Quản lý hệ thống", numChildTabs: 2, childTabs: [
            { title: "Người dùng", to: "/quan-ly-he-thong/nguoi-dung" },
            { title: "Phân quyền hệ thống", to: "/quan-ly-he-thong/phan-quyen-he-thong" },
        ]
    },
]