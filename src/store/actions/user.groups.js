import * as actionTypes from './actionTypes';
import { groupService } from "../../services/group";
import { userGroupService } from "../../services/user.group";
import { helperService } from '../../services';
import history from "../../hoc/Config/history"
import { customVariables } from '../../hoc/Config/customVariables';

const createUserGroup = (groupName) => {
    return dispatch => {
        dispatch(createUserGroupRequest());
        var name = "";
        if (groupName) {
            name = groupName
        } else {

            name = helperService.generateRndStr(10);
        }
        groupService.createGroup(name)
            .then((response) => {
                var groupId = response.id;
                localStorage.setItem(customVariables.GROUPID, groupId)
                var userId = helperService.getUserId();
                const countLimits={
                    weekdayCountLimit:0,
                    weekendCountLimit:0
                }
                userGroupService.createUserGroup(userId, countLimits)
                    .then((response) => {
                        
                        dispatch(createUserGroupSuccess(response,groupId));
                        if (response) {
                            history.push({
                                pathname: '/splash/location',
                                state: { groupId: groupId }
                            })
                        }

                    })
                    .catch((error) => {
                        dispatch((createUserGroupFailure(error)));

                    });
            })
            .catch((error) => {
                dispatch((createUserGroupFailure));
            })
    }
}


const createUserGroupRequest = () => {
    return {
        type: actionTypes.CREATE_USER_GROUP_REQUEST,
    };
};

const createUserGroupSuccess = (response,groupId) => {
    return {
        type: actionTypes.CREATE_USER_GROUP_SUCCESS,
        response: response,
        groupId:groupId
        // id: response.id,
        // groupId: response.groupId,
    };
}


const createUserGroupFailure = (err) => {

    return {
        type: actionTypes.CREATE_USER_GROUP_FAILURE,
        erorObj: err,
    };
}

const updateUserGroup=(userGroupId,data)=>{
    return dispatch=>{
        userGroupService.updateUserGroup(userGroupId,data)
        .then(response=>{
            dispatch(updateUserGroupSuccess());
        })
        .catch(error=>{
            dispatch(updateUserGroupFailed(error));
        })
    }
}

export const updateUserGroupSuccess = (id, userData) => {
    return {
        type: actionTypes.UPDATE_USER_GROUP_SUCCESS
    };
};

export const updateUserGroupFailed = (error) => {
    return {
        type: actionTypes.UPDATE_USER_GROUP_FAIL,
        errorObj: error,
        error: true
    };
};

export const userGroupActions = {
    createUserGroup,
    updateUserGroup
};





