import { combineReducers } from 'redux'
import userReducer from './user'
import formFileReducer from './formFile'
import sideBarReducer from './sidebar'
import govfileReducer from './govfile'
import docCategoryReducer from './docCategory'
import modalCensorshipReducer from './modalCensorship'
import loginReducer from './login'
import reFetchFileReducer from './reFetchFile'
import userPermissionReducer from './userPermission'
import languageReducer from './language'
import maintanceReducer from './maintance'
import formatReducer from './format'
import organIdReducer from './organId'
const rootReducer = combineReducers({
    user: userReducer,
    formFile: formFileReducer,
    sideBar: sideBarReducer,
    govfile: govfileReducer,
    docCategory: docCategoryReducer, 
    modalCensorship: modalCensorshipReducer,
    login: loginReducer,
    reFetchFile: reFetchFileReducer,
    userPermission: userPermissionReducer,
    language: languageReducer,
    maintance: maintanceReducer,
    format: formatReducer,
    organId: organIdReducer
})

export default rootReducer
