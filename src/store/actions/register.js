import { authService } from "../../services/auth";
import { groupService } from "../../services/group";
import { userGroupService } from "../../services/user.group";


import * as actionTypes from "./actionTypes";


const register = (email, fullName, title, password) => {
    return dispatch => {
        dispatch(registerRequest());
        authService.register(email, fullName, password, title)
            .then((response) => {
                dispatch(registerSuccess(response));
                var userId = response.id;
                var timestamp = new Date().getUTCMilliseconds();
                console.log('timestamp', timestamp);
                groupService.createGroup('GRUP_' + timestamp)
                    .then((response) => {
                        console.log('cg-s', response);
                        var groupId = response.id;
                        userGroupService.createUserGroup(userId, groupId)
                            .then()
                            .catch((error) => {
                                dispatch(registerFailure(error));
                            });
                    })
                    .catch((error) => {
                        console.log('cg-e', error);
                        dispatch(registerFailure(error));
                    })

                //Dönen modelden UserId alacağım,    ---- > Id- UserId

                //CreateGroup   --> Id -> GroupId


                // CreateuserGroup ()



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
        erorObj: err,
        type: actionTypes.REGISTER_FAILURE,
        statusCode: err.data.error.statusCode, // BadRequestError
        statusText: err.data.error.message,  // Invalid email or password
        statusName: err.data.error.name,   // BadRequestError

    };
}

export const registerActions = {
    register
};
