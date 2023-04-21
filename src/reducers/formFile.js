const initialState = {
    state: "close",
    data: {
        id: null,
    }
}

const formFileReducer = (state = initialState, action) => {

    switch (action.type) {
        case "CLOSE":
            return {
                state: "close",
            }
        case "OPEN": {
            const cur = {}
            cur["state"] = "open"
            cur["data"] = action.payload
            return cur
        }
        default:
            return state
    }
}

export default formFileReducer