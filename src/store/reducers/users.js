import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { helperService } from "../../services/helper";

const initialState = {
    users: null,
    globalUsers: null,
    groupUsersCount: null,
    error: false,
    globalUsersError: false,
    crudSuccess: false
};

const setUsers = (state, action) => {
    const updatedState = {
        users: action.users,
        defaultUsers: action.defaultUsers,
        usersCount: action.usersCount,
        defaultUsersCount: action.defaultUsersCount,
        error: false
    };
    return updateObject(state, updatedState);
};

const fetchUsersFail = (state, action) => {
    const updatedState = {
        error: true
    };
    return updateObject(state, updatedState);
};

const setGlobalUsers = (state, action) => {
    const updatedState = {
        globalUsers: action.globalUsers,
        globalUsersError: false
    };
    return updateObject(state, updatedState);
};

const setGroupUsersCount = (state, action) => {
    const updatedState = {
        groupUsersCount: action.groupUsersCount,
        error: false
    };
    return updateObject(state, updatedState);
};

const fetchGlobalUsersFail = (state, action) => {
    const updatedState = {
        globalUsersError: true,
        crudSuccess: false
    };
    return updateObject(state, updatedState);
};

const updateUserSuccess = (state, action) => {
    const updatedState = {

        users: action.users,
        error: false,
        crudSuccess: true,
        message: 'Kullanıcı güncellendi.'
    };
    return updateObject(state, updatedState);
};

const updateUserFail = (state, action) => {
    const updatedState = {
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    };
    return updateObject(state, updatedState);
};

const createUserSuccess = (state, action) => {
    const updatedState = {
        error: false,
        crudSuccess: true,
        message: 'Kullanıcı oluşturuldu.'
    };
    return updateObject(state, updatedState);
};

const createUserFail = (state, action) => {
    const updatedState = {
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    };
    return updateObject(state, updatedState);
};

const deleteUserGroupSuccess = (state, action) => {
    const updatedState = {
        error: false,
        crudSuccess: true,
        users:action.users,
        defaultUsers:action.defaultUsers,
        usersCount: action.usersCount,
        message: 'Kullanıcı silindi.'
    };
    return updateObject(state, updatedState);
};

const deleteUserGroupFail = (state, action) => {
    const updatedState = {
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    };
    return updateObject(state, updatedState);
};

const createUserGroupBulkSuccess = (state, action) => {
    const updatedState = {
        error: false
    };
    return updateObject(state, updatedState);
};

const createUserGroupBulkFail = (state, action) => {
    const updatedState = {
        error: true
    };
    return updateObject(state, updatedState);
};

const userCleanFlags = (state, action) => {
    const updatedState = {
        error: false,
        crudSuccess: false
    };
    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS: return setUsers(state, action);
        case actionTypes.FETCH_USERS_FAILED: return fetchUsersFail(state, action);
        case actionTypes.SET_GLOBAL_USERS: return setGlobalUsers(state, action);
        case actionTypes.SET_GROUP_USERS_COUNT: return setGroupUsersCount(state, action);
        case actionTypes.FETCH_GLOBAL_USERS_FAILED: return fetchGlobalUsersFail(state, action);
        case actionTypes.UPDATE_USER_SUCCESS: return updateUserSuccess(state, action);
        case actionTypes.UPDATE_USER_FAIL: return updateUserFail(state, action);
        case actionTypes.CREATE_USER_SUCCESS: return createUserSuccess(state, action);
        case actionTypes.CREATE_USER_FAIL: return createUserFail(state, action);
        case actionTypes.DELETE_USER_GROUP_SUCCESS: return deleteUserGroupSuccess(state, action);
        case actionTypes.DELETE_USER_GROUP_FAIL: return deleteUserGroupFail(state, action);
        case actionTypes.CREATE_USERGROUPBULK_SUCCESS: return createUserGroupBulkSuccess(state, action);
        case actionTypes.CREATE_USERGROUPBULK_FAILURE: return createUserGroupBulkFail(state, action);
        case actionTypes.USER_CLEAN_FLAGS: return userCleanFlags(state, action);
        default:
            return state;
    }
}

export default reducer;