export const CloseFile = () => {
    return {
        type: "CLOSE_FILE"
    }
}

export const CreateFile = () => {
    return {
        type: "CREATE_FILE"
    }
}

export const OpenFile = (id = null) => {
    return {
        type: "WATCH_FILE",
        id: id
    }
}

export const EditFile = (id = null) => {
    return {
        type: "EDIT_FILE",
        id: id
    }
}