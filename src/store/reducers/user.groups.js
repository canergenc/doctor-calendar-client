import * as actionTypes from '../actions/actionTypes';
import { helperService } from "../../services/helper";

const initialState = {
    groups: null,
    crudUserGroupSuccess: false,
    userGroupError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_USER_GROUP_REQUEST:
            return {
                ...state,
                createUserGroupReqLoading: true
            };
        case actionTypes.CREATE_USER_GROUP_SUCCESS:
            return {
                ...state,
                createUserGroupReqLoading: false,
                crudUserGroupSuccess: true,
                responseOnCreateUserGroup: action.response,
                groupId: action.groupId

            };

        case actionTypes.CREATE_USER_GROUP_FAILURE:
            return {
                ...state,
                createUserGroupReqLoading: false,
                crudUserGroupSuccess: false,
                responseOnCreateUserGroup: {},
                statusTextAtCreateUserGroup: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.UPDATE_USER_GROUP_SUCCESS:
            return {
                ...state,
                crudUserGroupSuccess: true,
                userGroupError: false
            };
        case actionTypes.UPDATE_USER_GROUP_FAIL:
            return {
                ...state,
                crudUserGroupSuccess: false,
                userGroupError: true,
                errorMessage: helperService.getErrorMessage(action.errorObj)
            };
        case actionTypes.USER_GROUP_CLEAN_FLAGS:
            return {
                ...state,
                crudUserGroupSuccess: false,
                userGroupError: false
            };
        default:
            return state;
    }
}

export default reducer;