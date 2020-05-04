import { userService } from "../../services"
import * as actionTypes from "./actionTypes";
import history from "../../hoc/Config/history"
import { constants } from "../../variables/constants";


const getUserInfo = () => {
    return dispatch => {
        dispatch(userInfoRequest());
        userService.userMe().then((response) => {
            dispatch(userInfoSuccess(response))
        }).catch((error) => {
            dispatch(userInfoFailure(error));
        });
    }
}

const getUserInfoByAuth = () => {
    return dispatch => {
        dispatch(userInfoRequest());
        userService.userMe().then((response) => {
            dispatch(userInfoSuccess(response))
            if (response.groups && response.groups.length > 0) {
                localStorage.setItem(constants.GROUPID,response.groups[0].id);
                history.push('/admin/index'); 
            } else {
                history.push('/splash/index');
            }

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
        deviceId: response.user.deviceId,
        createdDate: response.user.createdDate,
        updatedDate: response.user.updatedDate,
        groupId: response.groups.length > 0 ? response.groups[0].id : 0,
        groupName: response.groups.length > 0 ? response.groups[0].name : ""

    };
}

const userInfoFailure = (error) => {
    return {
        type: actionTypes.USERINFO_FAILURE,
        errorObj: error
    };
}

const updateUserInfo = (id, data) => {
    return dispatch => {
        dispatch(updateUserInfoRequest());
        userService.updateUserService(id, data).then((response) => {
            dispatch(updateUserInfoSuccess(response));
            dispatch(getUserInfo());

        }).catch((error) => {
            dispatch(updateUserInfoFailure(error));
        });
    }
}


const updateUserInfoRequest = () => {
    return {
        type: actionTypes.UPDATE_USERINFO_REQUEST
    };
};

const updateUserInfoSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_USERINFO_SUCCESS
    };
}


const updateUserInfoFailure = (error) => {
    return {
        type: actionTypes.UPDATE_USERINFO_FAILURE,
        errorObj: error
    };
}

export const userInfoActions = {
    updateUserInfo,
    getUserInfo,
    getUserInfoByAuth
};