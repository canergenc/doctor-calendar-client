import { userService } from "../../services"
import * as actionTypes from "./actionTypes";

const login = (email, password) => {
    return dispatch => {
        dispatch(loginRequest());
        userService.login(email, password).then((response) => {
            console.log('in reducer success', response);
            dispatch(loginSuccess(response.token));
        }).catch((error) => {
            dispatch(loginFailure(error));
        });
    }
}


export const loginRequest = () => {
    return {
        type: actionTypes.LOGIN_REQUEST,
    };
};

const loginSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            token: token
        }
    };
}


const loginFailure = (err) => {

    console.log('in reducer error', err);
    return {
        type: actionTypes.LOGIN_FAILURE,
        statusCode: err.data.error.statusCode, // BadRequestError
        statusText: err.data.error.message,  // Invalid email or password
        statusName: err.data.error.name,   // BadRequestError

    };
}





export const authActions = {
    login
};


