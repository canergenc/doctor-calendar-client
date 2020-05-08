import * as actionTypes from '../actions/actionTypes';
import { helperService } from "../../services/helper";
import { updateObject } from '../utility';

const initialState = {
    groups: null,
    crudUserGroupSuccess: false,
    userGroupError: false
}

const createUserGroupSuccess = (state, action) => {
    const updatedState = {
        createUserGroupReqLoading: false,
        crudUserGroupSuccess: true,
        responseOnCreateUserGroup: action.response,
        groupId: action.groupId
    }
    return updateObject(state, updatedState);
};

const createUserGroupFail = (state, action) => {
    const updatedState = {
        createUserGroupReqLoading: false,
        crudUserGroupSuccess: false,
        responseOnCreateUserGroup: {},
        statusTextAtCreateUserGroup: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const updateUserGroupSuccess = (state, action) => {
    const updatedState = {
        crudUserGroupSuccess: true,
        userGroupError: false
    }
    return updateObject(state, updatedState);
};

const updateUserGroupFail = (state, action) => {
    const updatedState = {
        crudUserGroupSuccess: false,
        userGroupError: true,
        errorMessage: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const userGroupCleanFlags = (state, action) => {
    const updatedState = {
        crudUserGroupSuccess: false,
        userGroupError: false
    }
    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_USER_GROUP_REQUEST: return updateObject(state, { createUserGroupReqLoading: true });
        case actionTypes.CREATE_USER_GROUP_SUCCESS: return createUserGroupSuccess(state, action);
        case actionTypes.CREATE_USER_GROUP_FAILURE: return createUserGroupFail(state, action);
        case actionTypes.UPDATE_USER_GROUP_SUCCESS: return updateUserGroupSuccess(state, action);
        case actionTypes.UPDATE_USER_GROUP_FAILURE: return updateUserGroupFail(state, action);
        case actionTypes.USER_GROUP_CLEAN_FLAGS: return userGroupCleanFlags(state, action);
        default:
            return state;
    }
}

export default reducer;