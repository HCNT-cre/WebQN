const initialState = {
    current_state: null,
    new_state: null
}

const stateFileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLOSE_STATE":
            return state => ({ current_state: 1, new_state: 2 })
        case "SUBMIT_FOR_ORGAN":
            return state => ({ current_state: 2, new_state: 3 })
        case "STORAGE_ORGAN_SUCCESS":
            return state => ({ current_state: 3, new_state: 4 })
        case "STORAGE_ORGAN_FAIL":
            return state => ({ current_state: 3, new_state: 1 })
        case "SUBMIT_FOR_HISTORY":
            return state => ({ current_state: 4, new_state: 5 })
        case "STORAGE_HISTORY_SUCCESS":
            return state => ({ current_state: 5, new_state: 6 })
        case "STORAGE_HISTORY_FAIL":
            return state => ({ current_state: 5, new_state: 4 })
        default:
            return state
    }
}

export default stateFileReducer