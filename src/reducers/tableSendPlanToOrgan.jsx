const tableSenPlanToOrganReducer = (state = {state: false}, action) => {
    switch (action.type) {
        case "open_table_send_plan_to_organ":
            return {
                ...state,
                ...action,
                state: true,
            }
        case "close_table_send_plan_to_organ":
            return {
                ...state,
                ...action,
                state: false,

            }
        default:
            return state
    }
}
export default tableSenPlanToOrganReducer
