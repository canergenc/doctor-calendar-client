import { authService } from "../../services/auth"
import * as actionTypes from "./actionTypes";
import history from "../../hoc/Config/history"
import { customVariables } from "../../hoc/Config/customVariables";
import { userInfoActions } from "./user.info"


const login = (email, password) => {
    return dispatch => {
        dispatch(loginRequest());
        authService.login(email, password).then((response) => {
            localStorage.setItem(customVariables.TOKEN, response.token);
            dispatch(loginSuccess(response.token))
            dispatch(userInfoActions.getUserInfo());
            history.push('/admin/index');
        }).catch((error) => {
            dispatch(loginFailure(error));
        });
    }
}


const loginRequest = () => {
    return {
        type: actionTypes.LOGIN_REQUEST,
    };
};

const loginSuccess = (token) => {


    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token
    };
}


const loginFailure = (err) => {

    return {
        type: actionTypes.LOGIN_FAILURE,
        erorObj: err,
        statusCode: err.data.error.statusCode, // BadRequestError
        statusText: err.data.error.message,  // Invalid email or password
        statusName: err.data.error.name,   // BadRequestError

    };
}


export const authActions = {
    login
};


