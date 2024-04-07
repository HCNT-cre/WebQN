const INIT_STATE = {
    open: false,
    reFetchData: null,
    order: 1,
    parent: null, 
    select: 1,
}

const modalCreateDanhMucCoQuanReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "open_modalCreateDanhMucCoQuanReducer":
            return {
                ...state,
                open: true,
                reFetchData: action.reFetchData,
                order: action.order,
                parent: action.parent,
                select: action.select,
            }
        case "close_modalCreateDanhMucCoQuanReducer":
            return INIT_STATE
        default:
            return INIT_STATE
    }
}

export default modalCreateDanhMucCoQuanReducer
