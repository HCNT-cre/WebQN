const modalCensorshipReducer = (state = { state: false, id: null }, action) => {
    switch (action.type) {
        case "open_modal":
            return {
                state: true,
                id: action.id,
                current_state: parseInt(action.current_state)
            }
        case "close_modal":
            return {
                state: false,
                id: action.id
            }
        default:
            return state
    }
}

export default modalCensorshipReducer