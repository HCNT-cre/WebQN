import { combineReducers } from 'redux'
import userReducer from './user'
import formFileReducer from './formFile'
import sideBarReducer from './sidebar'

const rootReducer = combineReducers({
    user: userReducer,
    formFile: formFileReducer,
    sideBar: sideBarReducer,
})

export default rootReducer