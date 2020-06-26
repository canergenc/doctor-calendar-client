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
                statusCode:null,
                statusText: helperService.getErrorMessage(action.erorObj)


            };

        case actionTypes.RE_CONFIRM_EMAIL_REQUEST:
            return {
                reConfirmLoading: true,
            };
        case actionTypes.RE_CONFIRM_EMAIL_SUCCESS:
            return {
                reConfirmLoading: false,
                reConfirmResponse: action.response
            };
        case actionTypes.RE_CONFIRM_EMAIL_FAILURE:
            return {
                reConfirmLoading: false,
                reConfirmStatusCode:null,
                reConfirmStatusText: helperService.getErrorMessage(action.erorObj)

            };
        default:
            return state;
    }
}
export default reducer;