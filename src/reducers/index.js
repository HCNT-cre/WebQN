import { combineReducers } from 'redux'
import userReducer from './user'
import formFileReducer from './formFile'
import sideBarReducer from './sidebar'
import govfileReducer from './govfile'

const rootReducer = combineReducers({
    user: userReducer,
    formFile: formFileReducer,
    sideBar: sideBarReducer,
    govfile: govfileReducer
})

export default rootReducer