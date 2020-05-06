import * as actionTypes from '../actions/actionTypes';
import { helperService } from "../../services/helper";

const initialState = {
    users: null,
    globalUsers: null,
    groupUsersCount: null,
    error: false,
    globalUsersError: false,
    crudSuccess: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.users,
                defaultUsers: action.defaultUsers,
                error: false
            };
        case actionTypes.FETCH_USERS_FAILED:
            return {
                ...state,
                error: true
            };
        case actionTypes.SET_GLOBAL_USERS:
            return {
                ...state,
                globalUsers: action.globalUsers,
                globalUsersError: false
            };
        case actionTypes.SET_GROUP_USERS_COUNT:
            return {
                ...state,
                groupUsersCount: action.groupUsersCount,
                error: false
            };
        case actionTypes.FETCH_GLOBAL_USERS_FAILED:
            return {
                ...state,
                globalUsersError: true,
                crudSuccess: false
            };
        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                error: false,
                crudSuccess: true,
                message:'Kullanıcı güncellendi.'
            };
        case actionTypes.UPDATE_USER_FAIL:
            return {
                ...state,
                error: true,
                crudSuccess: false,
                statusText: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                error: false,
                crudSuccess: true,
                message:'Kullanıcı oluşturuldu.'
            };
        case actionTypes.CREATE_USER_FAIL:
            return {
                ...state,
                error: true,
                crudSuccess: false,
                statusText: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.DELETE_USER_GROUP_SUCCESS:
            return {
                ...state,
                error: false,
                crudSuccess: true,
                message:'Kullanıcı silindi.'
            };
        case actionTypes.DELETE_USER_GROUP_FAIL:
            return {
                ...state,
                error: true,
                crudSuccess: false,
                statusText: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.CREATE_USERGROUPBULK_SUCCESS:
            return {
                ...state,
                error: false
            };
        case actionTypes.CREATE_USERGROUPBULK_FAILURE:
            return {
                ...state,
                error: true
            };
        case actionTypes.USER_CLEAN_FLAGS:
            return {
                ...state,
                error: false,
                crudSuccess: false
            };
        default:
            return state;
    }
}

export default reducer;