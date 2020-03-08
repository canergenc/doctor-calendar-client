import { userService } from "../../services"
import * as actionTypes from "./actionTypes";


const getUserInfo = () => {
    return dispatch => {
        dispatch(userInfoRequest());

        userService.userMe().then((response) => {
            console.log('userMe', response);

            const userId=response.id

            userService.userInfo(userId).then((response) => {
                console.log('info', response);
                dispatch(userInfoSuccess(response))
            }).catch((error) => {
                console.log(error);
                dispatch(userInfoFailure(error));
            });

        }).catch((error) => {
            dispatch(userInfoFailure(error));
        });





    }
}

const userInfoRequest = () => {
    return {
        type: actionTypes.USERINFO_REQUEST,
    };
};

const userInfoSuccess = (response) => {
    return {
        type: actionTypes.USERINFO_SUCCESS,
        id: response.id,
        email: response.email,
        fullName: response.fullName,
        title: response.title,
        deviceId: response.deviceId,
        createdDate: response.createdDate,
        updatedDate: response.updatedDate

    };
}


const userInfoFailure = (err) => {

    return {
        type: actionTypes.USERINFO_FAILURE,
        erorObj: err,
        statusCode: err.data.error.statusCode, // BadRequestError
        statusText: err.data.error.message,  // Invalid email or password
        statusName: err.data.error.name,   // BadRequestError

    };
}

export const userInfoActions = {
    getUserInfo
};