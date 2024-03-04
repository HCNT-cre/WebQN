const ModalConfirmSendPlanLuuTruLichSuReducer = (state = { state: false, id: null }, action) => {
    switch (action.type) {
        case "open_modal_confirm_send_plan_luu_tru_lich_su":
            return {
                ...state,
                state: true,
                id: action.id,
                name: action.name
            }
        case "close_modal_confirm_send_plan_luu_tru_lich_su":
            return {
                ...state,
                state: false,
                id: null
            }
        default:
            return state
    }
}

export default ModalConfirmSendPlanLuuTruLichSuReducer
