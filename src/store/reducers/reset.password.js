import * as actionTypes from '../actions/actionTypes';
import { constants } from '../../variables/constants';
import { helperService } from "../../services/helper"

const initialState = {
   
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESET_PASSWORD_REQUEST:
            return {
                loading: true,
            };
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                response:action.response
            };
        case actionTypes.RESET_PASSWORD_FAILURE:
            return {
                loading: false,
                statusText: helperService.getErrorMessage(action.errorObj)

            };
        default:
            return state;
    }
}
export default reducer;