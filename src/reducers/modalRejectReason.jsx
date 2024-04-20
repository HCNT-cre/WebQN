const INIT_STATE = {
    open: false,
    reason: null,
};

const modalRejectReasonReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "open_modalRejectReason":
            return {
                ...state,
                open: true,
                reason: action.reason,
            };
        case "close_modalRejectReason":
            return {
                ...INIT_STATE,
            };
        default:
            return INIT_STATE;
    }
};

export default modalRejectReasonReducer;