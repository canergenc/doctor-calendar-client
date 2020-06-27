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
    };
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
        errorObj: err,
    };
}

const confirmEmail = (key) => {
    console.log('confirm Mail');
    return dispatch => {
        dispatch(confirmEmailRequest());
        authService.confirmEmail(key).then((response) => {
            console.log('confirm Mail');

            console.log(response);
            if (response) {
                console.log('response true');
                
                if (response.statusCode) {
                    console.log('response has statusCode');
                    if (response.statusCode === 200 || response.statusCode === 409) {
                        console.log('response  statusCode 200 or 409');
                        dispatch(confirmEmailSuccess(response));
                    }
                }
                else{
                    console.log('response has no statusCode');
                    dispatch(confirmEmailSuccess(response));
                }
            }
        }).catch((error) => {
            dispatch(confirmEmailFailure(error));
        });
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
};

const confirmEmailFailure = (err) => {
    return {
        type: actionTypes.CONFIRM_EMAIL_FAILURE,
        errorObj: err,
    };
};

const resetState = () => {
    return dispatch => {
        dispatch(confirmEmailRequest());
        dispatch(reConfirmEmailRequest());
        dispatch(confirmEmailSuccess(null));
        dispatch(confirmEmailFailure(null));
        dispatch(reConfirmEmailSuccess(null));
        dispatch(reConfirmEmailFailure(null));
    }
}

export const confirmEmailAction = {
    confirmEmail,
    resetState,
    reConfirmEmail
};