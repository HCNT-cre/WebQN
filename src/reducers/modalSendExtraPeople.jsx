const INIT_STATE = {
    open: false,
    success: null,
    planIds: [],
}
const modalSendExtraPeopleReducer = (state = INIT_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case "open_modal_send_extra_people":
            return {
                ...state,
                open: true,
                planIds: action.planIds,
                success: action.success
            }
        case "close_modal_send_extra_people":
            return {
                ...INIT_STATE,
                success: action.success
            }
        default:
            return INIT_STATE
    }
}
export default modalSendExtraPeopleReducer
