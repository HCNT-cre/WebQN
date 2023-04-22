import { combineReducers } from 'redux'
import userReducer from './user'
import formFileReducer from './formFile'
import sideBarReducer from './sidebar'
import govfileReducer from './govfile'
import docCategoryReducer from './docCategory'
import modalCensorshipReducer from './modalCensorship'
import loginReducer from './login'

const rootReducer = combineReducers({
    user: userReducer,
    formFile: formFileReducer,
    sideBar: sideBarReducer,
    govfile: govfileReducer,
    docCategory: docCategoryReducer, 
    modalCensorship: modalCensorshipReducer,
    login: loginReducer
})

export default rootReducer