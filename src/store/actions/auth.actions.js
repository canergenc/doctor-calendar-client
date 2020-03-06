import { userService } from "../../services"
import * as actionTypes from "./actionTypes";
import history from "../../hoc/Config/history"
import { customVariables } from "../../hoc/Config/customVariables";
import { userInfoActions } from "./user.info.actions"


const login = (email, password) => {
    return dispatch => {
        dispatch(loginRequest());
        userService.login(email, password).then((response) => {
            localStorage.setItem(customVariables.TOKEN, response.token);
            dispatch(loginSuccess(response.token))
            userService.userMe().then((response) => {
                console.log('userMe', response.id);
                dispatch(userInfoActions.getUserInfo(response.id));
            }).catch((error) => {
                dispatch(loginFailure(error));
            });


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

const loginSuccess = (token) => {


    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token
    };
}


const loginFailure = (err) => {

    return {
        type: actionTypes.LOGIN_FAILURE,
        erorObj: err,
        statusCode: err.data.error.statusCode, // BadRequestError
        statusText: err.data.error.message,  // Invalid email or password
        statusName: err.data.error.name,   // BadRequestError

    };
}


export const authActions = {
    login
};


