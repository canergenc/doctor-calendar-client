import * as actionTypes from '../actions/actionTypes';
import { constants } from '../../variables/constants';
import { helperService } from "../../services/helper"
// import jwtDecode from 'jwt-decode';

const initialState = {
   
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FORGOT_REQUEST:
            return {
                loading: true,
            };
        case actionTypes.FORGOT_SUCCESS:
            return {
                loading: false,
                response:action.response
            };
        case actionTypes.FORGOT_FAILURE:
            return {
                loading: false,
                statusText: helperService.getErrorMessage(action.erorObj)

            };
        default:
            return state;
    }
}
export default reducer;