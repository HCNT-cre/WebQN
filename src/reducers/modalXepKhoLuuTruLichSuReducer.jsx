const INITIAL_STATE = {
    id: null,
    open: false,
}

const modalXepKhoLuuTruLichSuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "open_modalXepKhoLuuTruLichSu":
            return {
                ...state,
                id: action.id,
                open: true,
            }
        case "close_modalXepKhoLuuTruLichSu":
            return {
                ...state,
                id: null,
                open: false,
            }
        default:
            return state
    }
}

export default modalXepKhoLuuTruLichSuReducer;