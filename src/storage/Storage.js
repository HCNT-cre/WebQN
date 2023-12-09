export const STATE = [
	"Tất cả",
	"Mở",
	"Đóng",
	"Nộp lưu cơ quan",
	"Lưu trữ cơ quan",
	"Nộp lưu lịch sử",
	"Lưu trữ lịch sử",
	"Nộp lưu cơ quan bị trả về",
	"Nộp lưu lịch sử bị trả về",
	"Đã nhận nộp lưu",
	"Chờ xếp kho",
	"HSCL tạo mới",
	"HSCL giao nộp",
	"HSCL bị trả về",
];

export const ENUM_STATE_FILE = {
	TAT_CA: "Tất cả",
	MO: "Mở",
	DONG: "Đóng",
	NOP_LUU_CO_QUAN: "Nộp lưu cơ quan",
	LUU_TRU_CO_QUAN: "Lưu trữ cơ quan",
	NOP_LUU_LICH_SU: "Nộp lưu lịch sử",
	LUU_TRU_LICH_SU: "Lưu trữ lịch sử",
	NOP_LUU_CO_QUAN_BI_TRA_VE: "Nộp lưu cơ quan bị trả về",
	NOP_LUU_LICH_SU_BI_TRA_VE: "Nộp lưu lịch sử bị trả về",
	DA_NHAN_NOP_LUU: "Đã nhận nộp lưu",
	CHO_XEP_KHO: "Chờ xếp kho",
	HSCL_TAO_MOI: "HSCL tạo mới",
	HSCL_GIAO_NOP: "HSCL giao nộp",
	HSCL_BI_TRA_VE: "HSCL bị trả về",
};

export const ENUM_TYPE_PLAN = {
	THU_THAP_NOP_LUU: 1,
	BIEN_MUC_CHINH_LY: 2,
	QUYET_DINH_TIEU_HUY: 3,
	NOP_LUU_LICH_SU: 4,
}

export const ENUM_STATE_PLAN = {
	TAO_MOI: "Mới lập",
	CHO_DUYET: "Chờ duyệt",
	TU_CHOI: "Từ chối",
	CHAP_NHAN: "Đã duyệt",
}

export const ENUM_STATE_BMCL = {
	BMCL_PHE_DUYET_LUU_KHO: "BMCL_PHE_DUYET_LUU_KHO",
	BMCL_BO_SUNG_HO_SO_TAI_LIEU: "BMCL_BO_SUNG_HO_SO_TAI_LIEU",
	BMCL_DA_BO_SUNG_TAI_LIEU: "BMCL_DA_BO_SUNG_TAI_LIEU",
	BMCL_YEU_CAU_BO_SUNG_TAI_LIEU_DA_LUU_KHO: "BMCL_YEU_CAU_BO_SUNG_TAI_LIEU_DA_LUU_KHO",
}

export const TABS_SIDEBAR = [
	{
		isExpand: false,
		icon: `<i class="fa-solid fa-house"></i>`,
		title: "Trang chủ",
		to: "/",
		numChildTabs: 0,
		key: "/",
		display: true,
		number: 0,
	},

	{
		key: "/thu-thap-va-nop-luu",
		isExpand: false,
		icon: `<i class="fa-solid fa-database"></i>`,
		display: false,
		type: ["hoso"],
		title: "Thu thập và nộp lưu",
		numChildTabs: 6,
		number: 1,
		childTabs: [
			{
				title: "Tạo kế hoạch thu thập",
				to: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap",
				key: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap",
				number: 2,
			},

			{
				title: "Phê duyệt kế hoạch thu thập",
				to: "/thu-thap-va-nop-luu/phe-duyet-ke-hoach-thu-thap",
				key: "/thu-thap-va-nop-luu/phe-duyet-ke-hoach-thu-thap",
				number: 3,
			},
			{
				title: "Kế hoạch thu thập bị từ chối",
				to: "/thu-thap-va-nop-luu/ke-hoach-thu-thap-bi-tu-choi",
				key: "/thu-thap-va-nop-luu/ke-hoach-thu-thap-bi-tu-choi",
				number: 4,
			},
			{
				title:"Kế hoạch thu thập được phê duyệt",
				to:"/thu-thap-va-nop-luu/ke-hoach-thu-thap-duoc-duyet",
				key:"/thu-thap-va-nop-luu/ke-hoach-thu-thap-duoc-duyet",
				number: 5,
			},
			{
				title: "Thu thập hồ sơ",
				to: "/thu-thap-va-nop-luu/thu-thap-ho-so",
				key: "/thu-thap-va-nop-luu/thu-thap-ho-so",
				number: 6,
			},
			//{ title: "Nộp lưu cơ quan", to: "/thu-thap-va-nop-luu/nop-luu-co-quan", key: "/thu-thap-va-nop-luu/nop-luu-co-quan" },
			{
				title: "Duyệt hồ sơ nộp lưu",
				to: "/thu-thap-va-nop-luu/duyet-ho-so-nop-luu",
				key: "/thu-thap-va-nop-luu/duyet-ho-so-nop-luu",
				number: 7,
			},
			{
				title: "Hồ sơ nộp lưu bị trả về",
				to: "/thu-thap-va-nop-luu/ho-so-nop-luu-bi-tra-ve",
				key: "/thu-thap-va-nop-luu/ho-so-nop-luu-bi-tra-ve",
				number: 8,
			},
			{
				title: "Hồ sơ đến hạn nộp lưu",
				to: "/thu-thap-va-nop-luu/ho-so-den-han-nop-luu",
				key: "/thu-thap-va-nop-luu/ho-so-den-han-nop-luu",
				number: 9,
			},
			{
				title: "Hồ sơ đã nhận nộp lưu",
				to: "/thu-thap-va-nop-luu/ho-so-da-nhan-nop-luu",
				key: "/thu-thap-va-nop-luu/ho-so-da-nhan-nop-luu",
				number: 10,
			},
			// {
			// 	title: "Hồ sơ nộp lưu bị trả về",
			// 	to: "/thu-thap-va-nop-luu/ho-so-nop-luu-bi-tra-ve",
			// 	key: "/thu-thap-va-nop-luu/ho-so-nop-luu-bi-tra-ve",
			// },
			{
				title: "Biên bản bàn giao",
				to: "/thu-thap-va-nop-luu/bien-ban-ban-giao",
				key: "/thu-thap-va-nop-luu/bien-ban-ban-giao",
				number: 11,
			},
		],
	},
	{
		key: "/bien-muc-chinh-ly",
		isExpand: false,
		icon: `<i class="fa-solid fa-screwdriver-wrench"></i>`,
		display: false,
		type: ["hoso"],
		title: "Biên mục chỉnh lý",
		numChildTabs: 2,
		number: 12,
		childTabs: [
			{
				title: "Kế hoạch chỉnh lý",
				to: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
				key: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
				number: 13,
			},
			{
				title: "Biên mục hồ sơ",
				to: "/bien-muc-chinh-ly/bien-muc-ho-so",
				key: "/bien-muc-chinh-ly/bien-muc-ho-so",
				number: 14,

			},
			{
				title: "Phê duyệt lưu kho",
				to: "/bien-muc-chinh-ly/phe-duyet-luu-kho",
				key: "/bien-muc-chinh-ly/phe-duyet-luu-kho",
				number: 15,
			},
			{
				title: "Hồ sơ chỉnh lý bị trả về",
				to: "/bien-muc-chinh-ly/ho-so-chinh-ly-bi-tra-ve",
				key: "/bien-muc-chinh-ly/ho-so-chinh-ly-bi-tra-ve",
				number: 16,
			},
			{
				title: "Biên mục bổ sung",
				key: "/bien-muc-chinh-ly/bien-muc-bo-sung",
				isExpand: false,
				numChildTabs: 4,
				display: false,
				type: ["kho"],
				number: 17,
				childTabs: [
					{
						title: "Bổ sung hồ sơ tài liệu",
						to: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu",
						key: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu",
						number: 18,
						numChildTabs: 0,
					},
					{
						title: "Hồ sơ tài liêu đã được bổ sung",
						to: "/bien-muc-chinh-ly/bien-muc-bo-sung/ho-so-tai-lieu-da-duoc-bo-sung",
						key: "/bien-muc-chinh-ly/bien-muc-bo-sung/ho-so-tai-lieu-da-duoc-bo-sung",
						number: 19,
						numChildTabs: 0,
					},
					{
						title: "Bổ sung hồ sơ tài liệu đã lưu kho",
						to: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu-da-luu-kho",
						key: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu-da-luu-kho",
						number: 20,
						numChildTabs: 0,
					},
					{
						title: "Yêu cầu bổ sung hồ sơ tài liệu đã lưu kho",
						to: "/bien-muc-chinh-ly/bien-muc-bo-sung/yeu-cau-bo-sung-ho-so-tai-lieu-da-luu-kho",
						key: "/bien-muc-chinh-ly/bien-muc-bo-sung/yeu-cau-bo-sung-ho-so-tai-lieu-da-luu-kho",
						number: 21,
						numChildTabs: 0,
					},
				],
			},
			{
				title: "Phê duyệt lưu kho bổ sung",
				key: "/bien-muc-chinh-ly/phe-duyet-bien-muc-bo-sung",
				isExpand: false,
				numChildTabs: 2,
				display: false,
				type: ["kho"],
				number: 22,
				childTabs: [
					{
						title: "Duyệt bổ sung hồ sơ tài liệu",
						to: "/bien-muc-chinh-ly/phe-duyet-bien-muc-bo-sung/duyet-bo-sung-ho-so-tai-lieu",
						key: "/bien-muc-chinh-ly/phe-duyet-bien-muc-bo-sung/duyet-bo-sung-ho-so-tai-lieu",
						numChildTabs: 0,
						number: 23,
					},
					{
						title: "Duyệt bổ sung hồ sơ tài liệu đã lưu kho",
						to: "/bien-muc-chinh-ly/phe-duyet-bien-muc-bo-sung/duyet-bo-sung-ho-so-tai-lieu-da-luu-kho",
						key: "/bien-muc-chinh-ly/phe-duyet-bien-muc-bo-sung/duyet-bo-sung-ho-so-tai-lieu-da-luu-kho",
						numChildTabs: 0,
						number: 24,
					}
				],
			}
		],
	},
	
	// {
	// 	isExpand: false,
	// 	icon: '<i class="fa-solid fa-check"></i>',
	// 	title: "Duyệt chỉnh lý",
	// 	numChildTabs: 0,
	// 	to: "/duyet-chinh-ly",
	// 	key: "/duyet-chinh-ly",
	// 	display: true,
	// },
	
	{
		key: "/luu-tru-co-quan/",
		isExpand: false,
		icon: '<i class="fa-regular fa-building"></i>',
		display: false,
		type: ["hoso"],
		title: "Lưu trữ cơ quan",
		numChildTabs: 3,
		number: 25,
		childTabs: [
			{
				title: "Hồ sơ tài liệu giao nộp",
				to: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop",
				key: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop",
				number: 26,
			},
			{
				title: "Kho lưu trữ cơ quan",
				to: "/luu-tru-co-quan/kho-luu-tru-co-quan",
				key: "/luu-tru-co-quan/kho-luu-tru-co-quan",
				number: 27,
			},
			{
				title: "HS đến hạn nộp lưu LS",
				to: "/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su",
				key: "/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su",
				number: 28,
			},
			{
				title: "Hồ sơ bị trả về",
				to: "/luu-tru-co-quan/ho-so-bi-tra-ve",
				key: "/luu-tru-co-quan/ho-so-bi-tra-ve",
				number: 29,
			},
		],
	},
	{
		key: "/luu-tru-lich-su/",
		isExpand: false,
		icon: '<i class="fa-solid fa-arrow-rotate-right"></i>',
		display: false,
		type: ["hoso"],
		title: "Lưu trữ lịch sử",
		numChildTabs: 3,
		number: 30,
		childTabs: [
			{
				title: "Tạo kế hoạch nộp lưu lịch sử",
				to: "/luu-tru-lich-su/tao-ke-hoach-nop-luu-lich-su",
				key: "/luu-tru-lich-su/tao-ke-hoach-nop-luu-lich-su",
				number: 31,
			},
			// {
			// 	title: "Phê duyệt kế hoạch lưu trữ lịch sử",
			// 	to: "/luu-tru-lich-su/phe-duyet-ke-hoach-luu-tru-lich-su",
			// 	key: "/luu-tru-lich-su/phe-duyet-ke-hoach-luu-tru-lich-su",
			// },
			// {
			// 	title: "Kế hoạch lưu trữ lịch sử bị từ chối",
			// 	to: "/luu-tru-lich-su/ke-hoach-luu-tru-lich-su-bi-tu-choi",
			// 	key: "/luu-tru-lich-su/ke-hoach-luu-tru-lich-su-bi-tu-choi",
			// },
			{
				title: "Hồ sơ tài liệu giao nộp",
				to: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop",
				key: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop",
				number: 32,
			},
			{
				title: "Kho lưu trữ lịch sử",
				to: "/luu-tru-lich-su/kho-luu-tru-lich-su",
				key: "/luu-tru-lich-su/kho-luu-tru-lich-su",
				number: 33,
			},
			{
				title: "Biên bản bàn giao",
				to: "/luu-tru-lich-su/bien-ban-ban-giao",
				key: "/luu-tru-lich-su/bien-ban-ban-giao",
				number: 34,
			},
		],
	},
	{
		key: "/kho-luu-tru-to-chuc-ca-nhan/",
		isExpand: false,
		icon: `<i class="fa-solid fa-database"></i>`,
		display: false,
		type: ["hoso"],
		title: "Lưu trữ tổ chức, cá nhân",
		numChildTabs: 4,
		number: 35,
		childTabs: [
			{
				title: "Tạo hồ sơ thực hiện thủ tục hành chính",
				to: "/kho-luu-tru-to-chuc-ca-nhan/tao-ho-so-thuc-hien-thu-tuc-hanh-chinh",
				key: "/kho-luu-tru-to-chuc-ca-nhan/tao-ho-so-thuc-hien-thu-tuc-hanh-chinh",
				number: 36,
			},
			{
				title: "Duyệt hồ sơ thực hiện thủ tục hành chính",
				to: "/kho-luu-tru-to-chuc-ca-nhan/duyet-ho-so-thuc-hien-thu-tuc-hanh-chinh",
				key: "/kho-luu-tru-to-chuc-ca-nhan/duyet-ho-so-thuc-hien-thu-tuc-hanh-chinh",
				number: 37,
			},
			{
				title:"Hồ sơ thực hiện thủ tục hành chính bị từ chối",
				to:"/kho-luu-tru-to-chuc-ca-nhan/ho-so-thuc-hien-thu-tuc-hanh-chinh-bi-tu-choi",
				key:"/kho-luu-tru-to-chuc-ca-nhan/ho-so-thuc-hien-thu-tuc-hanh-chinh-bi-tu-choi",
				number: 38,
			},
			{
				title: "Kho hồ sơ thực hiện thủ tục hành chính",
				to: "/kho-luu-tru-to-chuc-ca-nhan/kho-ho-so-thuc-hien-thu-tuc-hanh-chinh",
				key: "/kho-luu-tru-to-chuc-ca-nhan/kho-ho-so-thuc-hien-thu-tuc-hanh-chinh",
				number: 39,
			},
		]
	},
	{
		key: "/tieu-huy-ho-so/",
		isExpand: false,
		icon: '<i class="fa-solid fa-trash"></i>',
		display: false,
		type: ["hoso"],
		title: "Tiêu hủy hồ sơ",
		numChildTabs: 3,
		number: 40,
		childTabs: [
			{
				icon: '<i class="fa-regular fa-newspaper"></i>',
				title: "Hồ sơ chờ tiêu hủy",
				key: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy",
				display: false,
				type: ["hoso"],
				isExpand: false,
				numChildTabs: 2,
				number: 41,
				childTabs: [
					{
						title: "Hết thời hạn bảo quản",
						to: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy/het-thoi-han-bao-quan",
						key: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy/het-thoi-han-bao-quan",
						number: 42,
						numChildTabs: 0,
					},
					{
						title: "Thời gian kết thúc",
						to: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy/thoi-gian-ket-thuc",
						key: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy/thoi-gian-ket-thuc",
						number: 43,
						numChildTabs: 0,
					}
				],
			},
			{
				icon: '<i class="fa-regular fa-newspaper"></i>',
				title: "Quyết định",
				key: "/tieu-huy-ho-so/quyet-dinh",
				display: false,
				type: ["hoso"],
				numChildTabs: 3,
				isExpand: false,
				number: 44,
				childTabs: [
					{
						title: "Tạo quyết định",
						to: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh",
						key: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh",
						number: 45,
						numChildTabs: 0,
					},
					{
						title: "Duyệt quyết định",
						to: "/tieu-huy-ho-so/quyet-dinh/duyet-quyet-dinh",
						key: "/tieu-huy-ho-so/quyet-dinh/duyet-quyet-dinh",
						number: 46,
						numChildTabs: 0,
					},
					{
						title: "Trả về",
						to: "/tieu-huy-ho-so/quyet-dinh/tra-ve",
						key: "/tieu-huy-ho-so/quyet-dinh/tra-ve",
						number: 47,
						numChildTabs: 0,
					}
				],
			},
			{
				title: "Khôi phục",
				key: "/tieu-huy-ho-so/khoi-phuc",
				display: false,
				type: ["kho"],
				numChildTabs: 3,
				isExpand: false,
				number: 48,
				childTabs: [
					{
						title: "Tạo quyết định",
						to: "/tieu-huy-ho-so/khoi-phuc/tao-quyet-dinh",
						key: "/tieu-huy-ho-so/khoi-phuc/tao-quyet-dinh",
						number: 49,
						numChildTabs: 0,
					},
					{
						title: "Duyệt quyết định",
						to: "/tieu-huy-ho-so/khoi-phuc/duyet-quyet-dinh",
						key: "/tieu-huy-ho-so/khoi-phuc/duyet-quyet-dinh",
						number: 50,
						numChildTabs: 0,
					},
					{
						title: "Trả về",
						to: "/tieu-huy-ho-so/khoi-phuc/tra-ve",
						key: "/tieu-huy-ho-so/khoi-phuc/tra-ve",
						numChildTabs: 0,
						number: 51,
					}
				],
			},
		],
	},
	{
		isExpand: false,
		icon: '<i class="fa-solid fa-copy"></i>',
		title: "Quản lí thông tin khai thác",
		display: false,
		type: ["hoso"],
		numChildTabs: 3,
		number: 52,
		childTabs: [
			{
				title: "Tìm kiếm và đăng ký mượn hồ sơ",
				to: "/quan-li-thong-tin-khai-thac/tim-kiem-va-dang-ky-muon-ho-so",
				key: "/quan-li-thong-tin-khai-thac/tim-kiem-va-dang-ky-muon-ho-so",
				number: 53,
			},
			{
				title: "Tìm kiếm và đăng ký mượn văn bản",
				to: "/quan-li-thong-tin-khai-thac/tim-kiem-va-dang-ky-muon-van-ban",
				key: "/quan-li-thong-tin-khai-thac/tim-kiem-va-dang-ky-muon-van-ban",
				number: 54,
			},
			{
				title: "Giỏ tài liệu",
				to: "/quan-li-thong-tin-khai-thac/gio-tai-lieu",
				key: "/quan-li-thong-tin-khai-thac/gio-tai-lieu",
				number: 55,
			},
			// {
			// 	title: "Tìm kiếm nâng cao",
			// 	to: "/quan-li-thong-tin-khai-thac/tim-kiem-nang-cao",
			// 	key: "/quan-li-thong-tin-khai-thac/tim-kiem-nang-cao",
			// },
			{
				title: "Danh sách yêu cầu sao hồ sơ, tài liệu",
				to: "/quan-li-thong-tin-khai-thac/danh-sach-yeu-cau-sao-ho-so-tai-lieu",
				key: "/quan-li-thong-tin-khai-thac/danh-sach-yeu-cau-sao-ho-so-tai-lieu",
				number: 56,
			},
			{
				title: "Danh sách yêu cầu chứng thực",
				to: "/quan-li-thong-tin-khai-thac/danh-sach-yeu-cau-sao-ho-so-va-chung-thuc",
				key: "/quan-li-thong-tin-khai-thac/danh-sach-yeu-cau-sao-ho-so-va-chung-thuc",
				number: 57,
			}
		],
	},
	{
		key: "/khai-bao-danh-muc/",
		isExpand: false,
		icon: '<i class="fa-solid fa-list"></i>',
		display: false,
		type: ["coquan", "kho"],
		title: "Khai báo danh mục",
		numChildTabs: 3,
		number: 58,
		childTabs: [
			{
				icon: '<i class="fa-regular fa-newspaper"></i>',
				title: "Danh mục cơ quan",
				to: "/khai-bao-danh-muc/danh-muc-co-quan",
				key: "/khai-bao-danh-muc/danh-muc-co-quan",
				display: false,
				number: 59,
				type: ["coquan"],
			},
			{
				icon: '<i class="fa-regular fa-newspaper"></i>',
				title: "Danh mục phông",
				to: "/khai-bao-danh-muc/danh-muc-phong",
				key: "/khai-bao-danh-muc/danh-muc-phong",
				display: false,
				number: 60,
				type: ["coquan"],
			},
			{
				icon: '<i class="fa-regular fa-newspaper"></i>',
				title: "Danh mục hồ sơ",
				to: "/khai-bao-danh-muc/danh-muc-ho-so",
				key: "/khai-bao-danh-muc/danh-muc-ho-so",
				display: false,
				type: ["coquan"],
				number: 61,
			},
			{
				icon: '<i class="fa-regular fa-newspaper"></i>',
				title: "Danh mục ngôn ngữ",
				to: "/khai-bao-danh-muc/danh-muc-ngon-ngu",
				key: "/khai-bao-danh-muc/danh-muc-ngon-ngu",
				display: false,
				type: ["coquan"],
				number: 62,
			},
			{
				icon: '<i class="fa-regular fa-newspaper"></i>',
				title: "Danh mục thời hạn bảo quản",
				to: "/khai-bao-danh-muc/danh-muc-thoi-han-bao-quan",
				key: "/khai-bao-danh-muc/danh-muc-thoi-han-bao-quan",
				display: false,
				type: ["coquan"],
				number: 63,
			},
			{
				icon: '<i class="fa-regular fa-newspaper"></i>',
				title: "Danh mục tình trạng vật lý",
				to: "/khai-bao-danh-muc/danh-muc-tinh-trang-vat-ly",
				key: "/khai-bao-danh-muc/danh-muc-tinh-trang-vat-ly",
				display: false,
				type: ["coquan"],
				number: 64,
			},
			{
				title: "Danh mục kho lưu trữ",
				key: "/khai-bao-danh-muc/danh-muc-kho-luu-tru",
				isExpand: false,
				numChildTabs: 3,
				display: false,
				type: ["kho"],
				number: 65,
				childTabs: [
					{
						title: "Kho",
						to: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/kho",
						key: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/kho",
						numChildTabs: 0,
						number: 66,
					},
					{
						title: "Phòng kho",
						to: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/phong-kho",
						key: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/phong-kho",
						numChildTabs: 0,
						number: 67,
					},
					{
						title: "Kệ",
						to: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/ke",
						key: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/ke",
						numChildTabs: 0,
						number: 68,
					},
					{
						title: "Hộp",
						to: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/hop",
						key: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/hop",
						numChildTabs: 0,
						number: 69,
					},
				],
			},
		],
	},
	
	{
		isExpand: false,
		icon: '<i class="fa-regular fa-file"></i>',
		title: "Tìm kiếm nâng cao",
		numChildTabs: 0,
		to: "/ho-so/tao-ho-so-dien-tu",
		key: "/ho-so/tao-ho-so-dien-tu",
		number: 70,
		display: true,
	},
	{
		isExpand: false,
		icon: '<i class="fa-solid fa-magnifying-glass"></i>',
		title: "Tìm kiếm hồ sơ",
		numChildTabs: 0,
		to: "/tra-cuu-va-tim-kiem",
		key: "/tra-cuu-va-tim-kiem",
		number: 71,
		display: true,
	},
	{
		isExpand: false,
		icon: '<i class="fa-regular fa-newspaper"></i>',
		title: "Báo cáo và thống kê",
		numChildTabs: 0,
		to: "/bao-cao-va-thong-ke",
		key: "/bao-cao-va-thong-ke",
		number: 72,
		display: true,
	},
	{
		key: "/quan-ly-he-thong/",
		isExpand: false,
		icon: '<i class="fa-solid fa-people-roof"></i>',
		display: false,
		title: "Quản lý hệ thống",
		numChildTabs: 2,
		number: 73,
		childTabs: [
			{
				title: "Người dùng",
				to: "/quan-ly-he-thong/nguoi-dung",
				key: "/quan-ly-he-thong/nguoi-dung",
				number: 74,
			},
			{
				title: "Phân quyền hệ thống",
				to: "/quan-ly-he-thong/phan-quyen-he-thong",
				key: "/quan-ly-he-thong/phan-quyen-he-thong",
				number: 75,
			},
		],
	},
];

export const LIST_PERMISSION = [
	{ id: 1, name: "admin | log entry | Can add log entry" },
	{ id: 2, name: "admin | log entry | Can change log entry" },
	{ id: 3, name: "admin | log entry | Can view log entry" },
	{ id: 4, name: "admin | log entry | Can add log entry" },
	{ id: 5, name: "admin | log entry | Can change log entry" },
	{ id: 6, name: "admin | log entry | Can view log entry" },
];

export const LANGUAGE = [
	{ title: "Tên ngôn ngữ", key: "name", width: "100%" },
	{ title: "Mã ngôn ngữ", key: "code", width: "100%" },
	{ title: "", key: "update", width: "100px" }
]

export const LANGUAGE_INPUT = [
	{ type: "text", require: true, name: "name", label: "Tên ngôn ngữ" },
	{ type: "text", require: true, name: "code", label: "Mã ngôn ngữ" },
]


export const PHYSICAL_STATE = [
	{ title: "Mã tình trạng vật lý", key: "code", width: "100%" },
	{ title: "Tên tình trạng vật lý", key: "name", width: "100%" },
	{ title: "", key: "update", width: "100px" }
]

export const PHYSICAL_STATE_INPUT = [
	{ type: "text", require: true, name: "code", label: "Mã tình trạng vật lý" },
	{ type: "text", require: true, name: "name", label: "Tên tình trạng vật lý" },
]

export const STORAGE_DURATION = [
	{ title: "Mã thời hạn bảo quản", key: "code", width: "100%" },
	{ title: "Thời hạn", key: "duration", width: "100%" },
	{ title: "Số năm", key: "number_of_year", width: "100%" },
	{ title: "", key: "update", width: "100px" }
]

export const STORAGE_DURATION_INPUT = [
	{ type: "text", require: true, name: "code", label: "Mã thời hạn bảo quản" },
	{ type: "number", require: true, name: "duration", label: "Thời hạn" },
	{ type: "number", require: true, name: "number_of_year", label: "Số năm" },
]

export const FOND = [
	{ title: "Mã cơ quan lưu trữ", key: "identifier", width: "100%" },
	{ title: "Mã phông/công trình/sưu tập lưu trữ", key: "organ_id", width: "100%" },
	{ title: "Tên phông/công trình/sưu tập lưu trữ", key: "fond_name", width: "100%" },
	{ title: "", key: "update", width: "100px" },
];


export const FOND_INPUT = [
	{ type: "text", require: true, name: "identifier", label: "Mã cơ quan lưu trữ" },
	{ type: "select", require: true, name: "organ_id", label: "Mã phông/công trình/sưu tập lưu trữ" },
	{ type: "text", require: true, name: "fond_name", label: "Tên phông/công trình/sưu tập lưu trữ" },
	{ type: "text", require: true, name: "fond_history", label: "Lịch sử đơn vị hình thành phông" },
	{ type: "text", require: true, name: "archives_time", label: "Thời gian tài liệu" },
	{ type: "number", require: true, name: "paper_total", label: "Tổng số tài liệu giấy" },
	{ type: "number", require: true, name: "paper_digital", label: "Số lượng tài liệu giấy đã số hóa" },
	{ type: "text", require: true, name: "key_groups", label: "Các nhóm tài liệu chủ yếu" },
	{ type: "text", require: true, name: "other_types", label: "Các loại hình tài liệu khác" },
	{ type: "text", require: true, name: "language", label: "Ngôn ngữ" },
	{ type: "text", require: true, name: "lookup_tools", label: "Công cụ tra cứu" },
	{ type: "number", require: true, name: "copy_number", label: "Số lượng trang tài liệu đã lập bản sao bảo hiểm" },
	{ type: "text", require: true, name: "description", label: "Ghi chú" },
];

export const FIELDS_TABLE_SEARCH_FILE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "150%" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id", width: "100%" },
    { title: "Số lượng tờ", key: "sheet_number", width: "70px" },
    { title: "Số lượng văn bản", key: "TotalDoc", width: "70px" },
    { title: "Thời gian bắt đầu", key: "start_date", width: "100%" },
    { title: "Thời gian kết thúc", key: "end_date", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "", key: "borrow", width: "100px" },
]
