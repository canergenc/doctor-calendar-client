import { login } from "../../services"
import * as actionTypes from "./actionTypes";

import { history } from '../../hoc/Config/history';



export const loginProcess = (email, password) => {
    return dispatch => {
        dispatch(request());
        login(email, password).then((response) => {
            console.log('in reducer success', response);
            // localStorage.setItem()
            dispatch(loginSuccess(response.token));

        }).catch((error) => {


            dispatch(loginFailure(error));
        });
    }
}


export const request = () => {
    return {
        type: actionTypes.LOGIN_REQUEST,
    };
};

export const loginSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            token: token
        }
    };

}


export const loginFailure = (err) => {

    console.log('in reducer error', err);
    return {
        type: actionTypes.LOGIN_FAILURE,
        statusCode: err.data.error.statusCode, // BadRequestError
        statusText: err.data.error.message,  // Invalid email or password
        statusName: err.data.error.name,   // BadRequestError

    };
}


