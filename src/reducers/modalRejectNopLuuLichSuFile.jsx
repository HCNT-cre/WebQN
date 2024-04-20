const INIT_STATE = {
    open: false,
    id: null,
    reFetchData: null,
};

const modalRejectNopLuuLichSuFileReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "open_modalRejectNopLuuLichSuFile":
            return {
                ...state,
                open: true,
                id: action.id,
                reFetchData: action.reFetchData,
            };
        case "close_modalRejectNopLuuLichSuFile":
            return {
                ...INIT_STATE,
            };
        default:
            return INIT_STATE;
    }
};

export default modalRejectNopLuuLichSuFileReducer;