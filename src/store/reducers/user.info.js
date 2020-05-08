import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { constants } from '../../variables/constants';
import { helperService } from "../../services/helper";

const initialState = {
    id: null,
    email: "",
    fullName: "",
    deviceId: "",
    createdDate: "",
    updatedDate: "",
    error: false,
    crudSuccess: false
};

const userInfoRequest = (state, action) => {
    const updatedState = {
        isReq: true,
        statusText: "",
        statusOfGetUser: false
    }
    return updateObject(state, updatedState);
};

const userInfoFail = (state, action) => {
    const updatedState = {
        statusOfGetUser: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const userInfoSuccess = (state, action) => {
    const updatedState = {
        id: action.id,
        email: action.email,
        fullName: action.fullName,
        deviceId: action.deviceId,
        createdDate: action.createdDate,
        updatedDate: action.updatedDate,
        statusText: constants.SUCCESS_MESSAGE.loginSuccess,
        statusOfGetUser: true
    }
    return updateObject(state, updatedState);
};

const updateUserInfoRequest = (state, action) => {
    const updatedState = {
        isReq: true
    }
    return updateObject(state, updatedState);
};

const updateUserInfoSuccess = (state, action) => {

    const updatedState = {
        isReq: false,
        error: false,
        crudSuccess: true,
        message:'Bilgileriniz güncellendi.'
    }
    return updateObject(state, updatedState);
};

const updateUserInfoFail = (state, action) => {
    const updatedState = {
        statusText: helperService.getErrorMessage(action.errorObj),
        isReq: false,
        error: true,
        crudSuccess: false
    }
    return updateObject(state, updatedState);
};

const cleanFlags = (state, action) => {
    return updateObject(state, { error: false, crudSuccess: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERINFO_REQUEST: return userInfoRequest(state, action);
        case actionTypes.USERINFO_SUCCESS: return userInfoSuccess(state, action);
        case actionTypes.USERINFO_FAILURE: return userInfoFail(state, action);
        case actionTypes.UPDATE_USERINFO_REQUEST: return updateUserInfoRequest(state, action);
        case actionTypes.UPDATE_USERINFO_SUCCESS: return updateUserInfoSuccess(state, action);
        case actionTypes.UPDATE_USERINFO_FAILURE: return updateUserInfoFail(state, action);
        case actionTypes.USER_INFO_CLEAN_FLAGS: return cleanFlags(state, action);
        default:
            return state;
    }
}
export default reducer;