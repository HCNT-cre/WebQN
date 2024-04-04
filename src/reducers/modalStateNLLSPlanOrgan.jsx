const initState = {
    open: false,
    planId: null,
    organId: null,
    reFetchData: null
}
const ModalStateNLLSPlanOrganReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case "open_modalStateNLLSPlanOrganReducer":
            return {
                ...state,
                open: true,
                planId: action.planId,
                organId: action.organId,
                reFetchData: action.reFetchData
            }
        case "close_modalStateNLLSPlanOrganReducer":
            return {
                ...state,
                initState
            }
        default:
            return state
    }
}

export default ModalStateNLLSPlanOrganReducer
