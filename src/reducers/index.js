import { combineReducers } from 'redux'
import userReducer from './user'
import formFileReducer from './formFile'
const rootReducer = combineReducers({
    user: userReducer,
    formFile: formFileReducer,
})

export default rootReducer