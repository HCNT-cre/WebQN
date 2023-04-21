export const CloseFile = () => {
    return {
        type: "CLOSE"
    }
}

export const OpenFile = (state, id = null) => {
    const newState = {
        id: id,
        state: state,
    }
    return {
        type: "OPEN",
        payload: newState
    }
}