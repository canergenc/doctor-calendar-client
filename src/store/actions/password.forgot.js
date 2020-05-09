import { authService } from "../../services/auth"
import * as actionTypes from "./actionTypes";
import { userInfoActions } from "./user.info"
import { constants } from "../../variables/constants";


const passwordForgot = (email) => {
    return dispatch => {
        dispatch(passwordForgotRequest());
        authService.forgotPassword(email).then((response) => {
            dispatch(passwordForgotSuccess(response))
        }).catch((error) => {
            dispatch(passwordForgotFailure(error));
        });
    }
}


const passwordForgotRequest = () => {
    return {
        type: actionTypes.FORGOT_REQUEST,
    };
};

const passwordForgotSuccess = (response) => {


    return {
        type: actionTypes.FORGOT_SUCCESS,
        response: response


    };
}


const passwordForgotFailure = (err) => {
    return {
        type: actionTypes.FORGOT_FAILURE,
        erorObj: err,
    };
}


export const passwordForgotAction = {
    passwordForgot
};


