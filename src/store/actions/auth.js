import { authService } from "../../services/auth"
import * as actionTypes from "./actionTypes";
import { customVariables } from "../../hoc/Config/customVariables";
import { userInfoActions } from "./user.info"


const login = (email, password, isRememberMe) => {
    return dispatch => {
        dispatch(loginRequest());
        authService.login(email, password).then((response) => {
            console.log('LOGİN',response);
            localStorage.setItem(customVariables.TOKEN, response.tokenModel.token);
            localStorage.setItem(customVariables.USERID, response.tokenModel.userId);
            localStorage.setItem(customVariables.REMEMBERME,isRememberMe);
            dispatch(loginSuccess(response.tokenModel))
            dispatch(userInfoActions.getUserInfoByAuth());
            


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

const loginSuccess = (tokenModel) => {


    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: tokenModel.token,
        iat:tokenModel.iat,
        exp:tokenModel.exp,
        userId:tokenModel.userId

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


