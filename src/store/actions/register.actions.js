import { userService } from "../../services"
import * as actionTypes from "./actionTypes";


const register = (email, fullName, title, password) => {
    return dispatch => {
        dispatch(registerRequest());
        userService.register(email, fullName, title, password).then((response) => {
            console.log('in reducer registersuccess', response);
            dispatch(registerSuccess(response));
        }).catch((error) => {
            dispatch(registerFailure(error));
        });
    }
}


const registerRequest = () => {
    return {
        type: actionTypes.REGISTER_REQUEST,
    };
};

 const registerSuccess = (user) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        user: user
    };

}

const registerFailure = (err) => {
    console.log('in reducer error', err);
    return {
        type: actionTypes.REGISTER_FAILURE,
        statusCode: err.data.error.statusCode, // BadRequestError
        statusText: err.data.error.message,  // Invalid email or password
        statusName: err.data.error.name,   // BadRequestError

    };
}

export const registerActions = {
    register
};
