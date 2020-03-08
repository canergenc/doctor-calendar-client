import * as actionTypes from '../actions/actionTypes';
import { helperService } from "../../services/helper"

// import jwtDecode from 'jwt-decode';

const initialState = {
    isRegistered: false,
    isRegistiring: false,
    user: null
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_REQUEST:
            return {
                isRegistiring: true,
                isRegistered: false,
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                isRegistiring: false,
                isRegistered: true,
                user: action.user
            };
        case actionTypes.REGISTER_FAILURE:
            return {
                isRegistiring: false,
                isRegistered: false,
                user: {},
                //statusText: `Authentication Error: ${action.statusCode} ${action.statusText}`
                statusText: helperService.getErrorMessage(action.erorObj)
            };
        default:
            return state;
    }
}
export default reducer;