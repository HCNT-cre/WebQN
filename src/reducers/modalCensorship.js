const modalCensorshipReducer = (state = { state: false, id: null }, action) => {
    console.log(action)
    switch (action.type) {
        case "open_modal":
            return {
                state: true,
                id: action.id
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