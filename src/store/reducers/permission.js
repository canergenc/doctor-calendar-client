import * as actionTypes from "../actions/actionTypes";
import { helperService } from "../../services/helper";

const initialState = {
    eror: false,
    responseOnGetPermission: [],
    responseOnGetApprovedPermission: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_PERMISSION_COUNT_REQUEST:
            return {
                ...state,
                getPermissionCountReqLoading: true
            };
        case actionTypes.GET_PERMISSION_COUNT_SUCCESS:
            return {
                ...state,
                getPermissionCountReqLoading: false,
                errorOnPermissionCount: false,
                permissionCount: action.permissionCount
            };
        case actionTypes.GET_PERMISSION_COUNT_FAILURE:
            return {
                ...state,
                getPermissionCountReqLoading: false,
                errorOnPermissionCount: true,
                permissionCount: {},
                errorPermission: true,
                statusTextAtPermissionCount: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.CREATE_PERMISSION_REQUEST:
            return {
                ...state,
                createPermissionReqLoading: true
            };
        case actionTypes.CREATE_PERMISSION_SUCCESS:
            return {
                ...state,
                createPermissionReqLoading: false,
                errorOnCreatePermission: false,
                responseOnCreatePermission: action.response,
                permissionCount: action.permissionCount
            };
        case actionTypes.CREATE_PERMISSION_FAILURE:
            return {
                ...state,
                createPermissionReqLoading: false,
                errorOnCreatePermission: true,
                responseOnCreatePermission: {},
                errorPermission: true,
                crudSuccess: false,
                statusTextAtCreatePermission: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.UPDATE_PERMISSION_REQUEST:
            return {
                ...state,
                updatePermissionReqLoading: true
            };
        case actionTypes.UPDATE_PERMISSION_SUCCESS:
            return {
                ...state,
                updatePermissionReqLoading: false,
                errorOnUpdatePermission: false,
                responseOnUpdatePermission: action.response,
                permissionCount: action.permissionCount
            };
        case actionTypes.UPDATE_PERMISSION_FAILURE:
            return {
                ...state,
                updatePermissionReqLoading: false,
                errorOnUpdatePermission: true,
                errorPermission: true,
                responseOnUpdatePermission: {},
                statusTextAtUpdatePermission: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.GET_PERMISSIONS_REQUEST:
            return {
                ...state,
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
                errorPermission: true,
                statusTexAtGet: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.GET_APPROVED_PERMISSIONS_REQUEST:
            return {
                ...state,
                getApprovedPermissionReqLoading: true
            };
        case actionTypes.GET_APPROVED_PERMISSIONS__SUCCESS:
            return {
                ...state,
                getApprovedPermissionReqLoading: false,
                errorOnGetApprovedPermission: false,
                responseOnGetApprovedPermission: action.response,
                approvedPermissionCount: action.permissionCount
            };
        case actionTypes.GET_APPROVED_PERMISSIONS__FAILURE:
            return {
                ...state,
                getApprovedPermissionReqLoading: false,
                errorOnGetApprovedPermission: true,
                responseOnGetApprovedPermission: {},
                errorPermission: true,
                statusTexAtGetApproved: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.PERMISSIONS_CLEAN_FLAGS:
            return {
                ...state,
                errorPermission: false
            };
        default:
            return state;
    }
}

export default reducer;


