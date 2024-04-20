const INIT_STATE = {
    open: false,
    organId: null,
    planId: null,
    reFetchData: null,
};

const modalRejectNopLuuLichSuOrganReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "open_modalRejectNopLuuLichSuOrgan":
            return {
                ...state,
                open: true,
                organId: action.organId,
                planId: action.planId,
                reFetchData: action.reFetchData,
            };
        case "close_modalRejectNopLuuLichSuOrgan":
            return {
                ...INIT_STATE,
            };
        default:
            return INIT_STATE;
    }
};

export default modalRejectNopLuuLichSuOrganReducer;