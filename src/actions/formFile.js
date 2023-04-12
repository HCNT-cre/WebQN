export const CloseFile = () =>{
    return {
        type: "CLOSE"
    }
}

export const OpenFile = (state, id=null) => {
    return {
        type: "OPEN",
        payload: {
            id: id,
            state: state,
        }
    }
}