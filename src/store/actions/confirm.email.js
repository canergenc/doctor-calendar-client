import { authService } from "../../services/auth"
import * as actionTypes from "./actionTypes";


const confirmEmail = (key) => {
    return dispatch => {
        dispatch(confirmEmailRequest());
        authService.confirmEmail(key).then((response) => {
            dispatch(confirmEmailSuccess(response))
        }).catch((error) => {
            dispatch(confirmEmailFailure(error));
        });
    }
}


const resetState = () => {
    return dispatch => {
        dispatch(confirmEmailRequest());
        dispatch(confirmEmailSuccess(null))
        dispatch(confirmEmailFailure(null));

    }
}


const confirmEmailRequest = () => {
    return {
        type: actionTypes.CONFIRM_EMAIL_REQUEST,
    };
};

const confirmEmailSuccess = (response) => {


    return {
        type: actionTypes.CONFIRM_EMAIL_SUCCESS,
        response: response


    };
}


const confirmEmailFailure = (err) => {
    return {
        type: actionTypes.CONFIRM_EMAIL_FAILURE,
        erorObj: err,
    };
}


export const confirmEmailAction = {
    confirmEmail,
    resetState
};


