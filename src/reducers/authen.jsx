const INITIAL_STATE = {
    isLogin: false,
    mail: null,
    name: null,
}

const AuthenReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogin: true,
                mail: action.payload.mail,
                username: action.payload.username
            }
        case "LOGOUT":
            return {
                ...state,
                isLogin: false,
            }
        case "REGISTER":
            return null
        case "FORGOT_PASSWORD":
            return null
        default:
            return state
    }
}

export default AuthenReducer
