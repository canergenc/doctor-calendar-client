import { authService } from "../../services/auth"
import * as actionTypes from "./actionTypes";


const resetPassword = (email,password,token) => {
    return dispatch => {
        dispatch(resetPasswordRequest());
        authService.resetPassword(email,password,token).then((response) => {
            dispatch(resetPasswordSuccess(response))
        }).catch((error) => {
            dispatch(resetPasswordFailure(error));
        });
    }
}


const resetPasswordRequest = () => {
    return {
        type: actionTypes.RESET_PASSWORD_REQUEST,
    };
};

const resetPasswordSuccess = (response) => {


    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        response: response


    };
}


const resetPasswordFailure = (err) => {
    return {
        type: actionTypes.RESET_PASSWORD_FAILURE,
        erorObj: err,
    };
}


export const resetPasswordAction = {
    resetPassword
};


