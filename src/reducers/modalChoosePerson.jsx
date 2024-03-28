const modalChoosePersonReducer = (state = {state: false}, action) => {
    switch (action.type) {
        case "open_modal_choose_person":
            return {
                ...state,
                state: true,
                data: action.data
            }
        case "close_modal_choose_person":
            return {
                ...state,
                state: false,
                success: action.success
            }
        default:
            return state
    }
}
export default modalChoosePersonReducer
