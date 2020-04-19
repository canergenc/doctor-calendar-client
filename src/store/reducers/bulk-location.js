import * as actionTypes from '../actions/actionTypes';
import { helperService } from "../../services/helper";

const initialState = {
    status: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_BULK_LOCATION_REQUEST:
            return {
                ...state,
                createBulkLocationReqLoading: true,
            };
        case actionTypes.CREATE_BULK_LOCATION_SUCCESS:
            return {
                createBulkLocationReqLoading: false,
                ...state,
                responseOnCreateBulkLocation:action.response,
                
                
            };
        case actionTypes.CREATE_BULK_LOCATION_FAILURE:
            return {
                responseOnCreateBulkLocation:{},
                createBulkLocationReqLoading: false,
                statusTextAtCreateBulkLocation: helperService.getErrorMessage(action.errorObj),
                ...state,
               
            }
        default:
            return state;
    }
}

export default reducer;