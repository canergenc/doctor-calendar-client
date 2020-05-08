import * as actionTypes from '../actions/actionTypes';
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

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const updateUserInfoSuccess = (state, action) => {
    console.log('update reducer');
    
    const updatedState = {
        isReq: false,
        error: false,
        crudSuccess: true
    }
    return updateObject(state, updatedState);
}

const updateUserInfoFail = (state, action) => {
    const updatedState = {
        statusText: helperService.getErrorMessage(action.errorObj),
        isReq: false,
        error: true,
        crudSuccess: false
    }
    return updateObject(state, updatedState);
}

const cleanFlags = (state, action) => {
    return updateObject(state, { error: false, crudSuccess: false });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERINFO_REQUEST:
            return {
                isReq: true,
                statusText: "",
                statusOfGetUser: false,
            };
        case actionTypes.USERINFO_SUCCESS:
            return {
                id: action.id,
                email: action.email,
                fullName: action.fullName,
                deviceId: action.deviceId,
                createdDate: action.createdDate,
                updatedDate: action.updatedDate,
                statusText: constants.SUCCESS_MESSAGE.loginSuccess,
                statusOfGetUser: true
            };
        case actionTypes.USERINFO_FAILURE:
            return {
                statusOfGetUser: false,
                statusText: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.UPDATE_USERINFO_REQUEST:
            return {
                ...state,
                isReq: true
            };
        case actionTypes.UPDATE_USERINFO_SUCCESS: updateUserInfoSuccess(state, action);
        case actionTypes.UPDATE_USERINFO_FAILURE: updateUserInfoFail(state, action);
        case actionTypes.USER_INFO_CLEAN_FLAGS: cleanFlags(state, action);
        default:
            return state;
    }
}
export default reducer;