const modalChoosePersonReducer = (state = {state: false}, action) => {
    switch (action.type) {
        case "open_modal_choose_person":
            return {
                ...state,
                state: true,
            }
        case "close_modal_choose_person":
            return {
                ...state,
                state: false,
            }
        default:
            return state
    }
}
export default modalChoosePersonReducer
