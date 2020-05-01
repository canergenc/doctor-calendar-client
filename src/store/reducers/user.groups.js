import * as actionTypes from '../actions/actionTypes';
import { helperService } from "../../services/helper";

const initialState = {
    groups: null,
    error: false
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
                responseOnCreateUserGroup: action.response,
                groupId:action.groupId
            
            };

        case actionTypes.CREATE_USER_GROUP_FAILURE:
            return {
                ...state,
                createUserGroupReqLoading: false,
                responseOnCreateUserGroup: {},
                statusTextAtCreateUserGroup: helperService.getErrorMessage(action.errorObj)
            };
        
        default:
            return state;
    }
}

export default reducer;