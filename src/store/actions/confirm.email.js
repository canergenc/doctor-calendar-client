import { authService } from "../../services/auth"
import * as actionTypes from "./actionTypes";




const reConfirmEmail = (email) => {
    return dispatch => {
        dispatch(reConfirmEmailRequest());
        authService.reConfirmEmail(email).then((response) => {
            dispatch(reConfirmEmailSuccess(response))
        }).catch((error) => {
            dispatch(reConfirmEmailFailure(error));
        });
    }
}



const reConfirmEmailRequest = () => {
    return {
        type: actionTypes.RE_CONFIRM_EMAIL_REQUEST,
    };
};

const reConfirmEmailSuccess = (response) => {


    return {
        type: actionTypes.RE_CONFIRM_EMAIL_SUCCESS,
        response: response


    };
}


const reConfirmEmailFailure = (err) => {
    return {
        type: actionTypes.RE_CONFIRM_EMAIL_FAILURE,
        erorObj: err,
    };
}




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
        dispatch(reConfirmEmailRequest());
        dispatch(confirmEmailSuccess(null))
        dispatch(confirmEmailFailure(null));
        dispatch(reConfirmEmailSuccess(null))
        dispatch(reConfirmEmailFailure(null));

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
    resetState,
    reConfirmEmail
};


