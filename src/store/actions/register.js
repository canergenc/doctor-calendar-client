import { authService } from "../../services/auth";
import history from "../../hoc/Config/history"
import * as actionTypes from "./actionTypes";


const register = (email, fullName, password) => {
    return dispatch => {
        dispatch(registerRequest());
        authService.register(email, fullName, password)
            .then((response) => {
                dispatch(registerSuccess(response));
                history.push({
                    pathname: '/auth/login',
                    state: { email: email}
                })

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
    return {
        errorObj: err,
        type: actionTypes.REGISTER_FAILURE,
        // statusCode: err.data.error.statusCode, // BadRequestError
        // statusText: err.data.error.message,  // Invalid email or password
        // statusName: err.data.error.name,   // BadRequestError

    };
}

export const registerActions = {
    register
};
