const APPLICANT = {
    permission_id: 1,
    role: "Nhân viên nhập liệu",
    permissions: [
        {
            permission_title: "Đóng hồ sơ",
            update_state: {
                current_state: 1,
                new_state: 2
            }
        },
        {
            permission_title: "Mở hồ sơ",
            update_state: {
                current_state: 2,
                new_state: 1
            }
        },
        {
            permission_title: "Nộp lưu cơ quan",
            update_state: {
                current_state: 2,
                new_state: 3
            }
        }
    ]
}

const APPLICATION_REVIEWER = {
    permission_id: 2,
    role: "Người duyệt đơn",
    permissions: [
        {
            permission_title: "Duyệt nộp lưu cơ quan",
            update_state: {
                current_state: 3,
                new_state: 4
            }
        },
        {
            permission_title: "Từ chối hồ sơ nộp lưu cơ quan",
            update_state: {
                current_state: 3,
                new_state: 1
            }
        },
        {
            permission_title: "Nộp lưu lịch sử",
            update_state: {
                current_state: 4,
                new_state: 5
            }
        }
    ]
}


const userReducer = (state = APPLICANT, action) => {
    switch (action.type) {
        case "SET_ROLE_TO_APPLICANT":
            return APPLICANT
        case "SET_ROLE_TO_APPLICATION_REVIEWER":
            return APPLICATION_REVIEWER
        default:
            return state
    }
}

export default userReducer