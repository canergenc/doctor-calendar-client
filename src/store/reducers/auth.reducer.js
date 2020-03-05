import * as actionTypes from '../actions/actionTypes';
import { constants } from '../../variables/constants';
import { helperService } from "../../services/helper.service"
// import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                isAuthenticating: true,
                statusText: null
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.token,
                userName: 'TEST', // jwtDecode(action.token).userName,
                statusText: constants.SUCCESS_MESSAGE.loginSuccess
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                userName: null,
                //statusText: `Authentication Error: ${action.statusCode} ${action.statusText}`
                statusText: helperService.getErrorMessage(action.erorObj)

            };
        default:
            return state;
    }
}
export default reducer;