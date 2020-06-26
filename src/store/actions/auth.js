import { authService } from "../../services/auth"
import * as actionTypes from "./actionTypes";
import { userInfoActions } from "./user.info"
import { constants } from "../../variables/constants";


const login = (email, password, isRememberMe) => {
    return dispatch => {
        dispatch(loginRequest());
        authService.login(email, password).then((response) => {
            localStorage.setItem(constants.TOKEN, response.tokenModel.token);
            localStorage.setItem(constants.USERID, response.tokenModel.userId);
            let rememberMe;
            if(isRememberMe){
                rememberMe=1;
            }else{
                rememberMe=0
            }
            localStorage.setItem(constants.REMEMBERME ,rememberMe);
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
        errorObj: err,
    };
}


export const authActions = {
    login
};


