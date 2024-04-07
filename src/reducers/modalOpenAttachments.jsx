const INIT_STATE = {
    open: false,
    attachments: null,
}

const modalOpenAttachmentsReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "open_modalOpenAttachments":
            return {
                ...state,
                open: true,
                attachments: action.attachments,
            }
        case "close_modalOpenAttachments":
            return INIT_STATE
        default:
            return INIT_STATE
    }
}

export default modalOpenAttachmentsReducer
