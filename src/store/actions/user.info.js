import { userService } from "../../services"
import * as actionTypes from "./actionTypes";


const getUserInfo = () => {
    return dispatch => {
        dispatch(userInfoRequest());

        userService.userMe().then((response) => {
            console.log('userMe', response);
            dispatch(userInfoSuccess(response))
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
        id: response.user.id,
        email: response.user.email,
        fullName: response.user.fullName,
        title: response.user.title,
        deviceId: response.user.deviceId,
        createdDate: response.user.createdDate,
        updatedDate: response.user.updatedDate,
        groupId: response.groups.length > 0 ? response.groups[0].id : 0,
        groupName: response.groups.length > 0 ? response.groups[0].name : ""

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