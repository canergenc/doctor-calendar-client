import * as actionTypes from "../actions/actionTypes";
import { helperService } from "../../services/helper";

const initialState = {
    eror: false,
    responseOnGetPermission: [],
    responseOnGetApprovedPermission:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CREATE_PERMISSION_REQUEST:
            return {
                createPermissionReqLoading: true
            };
        case actionTypes.CREATE_PERMISSION_SUCCESS:
            return {
                ...state,
                createPermissionReqLoading: false,
                errorOnCreatePermission: false,
                responseOnCreatePermission: action.response
            };
        case actionTypes.CREATE_PERMISSION_FAILURE:
            return {
                ...state,
                createPermissionReqLoading: false,
                errorOnCreatePermission: true,
                responseOnCreatePermission: {},
                statusTextAtCreatePermission: helperService.getErrorMessage(action.errorObj)
            };


        case actionTypes.UPDATE_PERMISSION_REQUEST:
            return {
                updatePermissionReqLoading: true
            };
        case actionTypes.UPDATE_PERMISSION_SUCCESS:
            return {
                ...state,
                updatePermissionReqLoading: false,
                errorOnUpdatePermission: false,
                responseOnUpdatePermission: action.response
            };
        case actionTypes.UPDATE_PERMISSION_FAILURE:
            return {
                ...state,
                updatePermissionReqLoading: false,
                errorOnUpdatePermission: true,
                responseOnUpdatePermission: {},
                statusTextAtUpdatePermission: helperService.getErrorMessage(action.errorObj)
            };


        case actionTypes.GET_PERMISSIONS_REQUEST:
            return {
                getPermissionReqLoading: true
            };
        case actionTypes.GET_PERMISSIONS_SUCCESS:
            return {
                ...state,
                getPermissionReqLoading: false,
                errorOnGetPermission: false,
                responseOnGetPermission: action.response
            };
        case actionTypes.GET_PERMISSIONS_FAILURE:
            return {
                ...state,
                getPermissionReqLoading: false,
                errorOnGetPermission: true,
                responseOnGetPermission: {},
                statusTexAtGet: helperService.getErrorMessage(action.errorObj)
            };


        case actionTypes.GET_APPROVED_PERMISSIONS_REQUEST:
            return {
                getApprovedPermissionReqLoading: true
            };
        case actionTypes.GET_APPROVED_PERMISSIONS__SUCCESS:
            return {
                ...state,
                getApprovedPermissionReqLoading: false,
                errorOnGetApprovedPermission: false,
                responseOnGetApprovedPermission: action.response
            };
        case actionTypes.GET_APPROVED_PERMISSIONS__FAILURE:
            return {
                ...state,
                getApprovedPermissionReqLoading: false,
                errorOnGetApprovedPermission: true,
                responseOnGetApprovedPermission: {},
                statusTexAtGetApproved: helperService.getErrorMessage(action.errorObj)
            };


        default:
            return state;
    }
}

export default reducer;


