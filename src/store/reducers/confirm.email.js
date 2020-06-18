import * as actionTypes from '../actions/actionTypes';
import { constants } from '../../variables/constants';
import { helperService } from "../../services/helper"

const initialState = {

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONFIRM_EMAIL_REQUEST:
            return {
                loading: true,
            };
        case actionTypes.CONFIRM_EMAIL_SUCCESS:
            return {
                loading: false,
                response: action.response
            };
        case actionTypes.CONFIRM_EMAIL_FAILURE:
            return {
                loading: false,
                statusText: helperService.getErrorMessage(action.erorObj)

            };
        default:
            return state;
    }
}
export default reducer;