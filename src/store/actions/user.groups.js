import * as actionTypes from './actionTypes';
import { groupService } from "../../services/group";
import { userGroupService } from "../../services/user.group";
import { groupSettingsService } from '../../services/index';
import { helperService } from '../../services';
import history from "../../hoc/Config/history"
import { constants } from '../../variables/constants';

const createUserGroup = (groupName, groupSettingsData) => {
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
                localStorage.setItem(constants.GROUPID, groupId)
                var userId = helperService.getUserId();
                const countLimits = {
                    weekdayCountLimit: 0,
                    weekendCountLimit: 0
                }
                userGroupService.createUserGroup(userId, countLimits)
                    .then((response) => {
                        const filterData = {
                            filter: {
                                where: {
                                    groupId: {
                                        like: groupId
                                    }
                                }
                            }
                        }
                        groupSettingsService.getGroupSettings(filterData)
                            .then(response => {
                                if (response.length > 0) {
                                    let groupSettingsId = response[0].id;

                                    groupSettingsService.updateGroupSettings(groupSettingsId, groupSettingsData)
                                        .then(response => {
                                            dispatch(createUserGroupSuccess(response, groupId));

                                            if (response) {
                                                history.push({
                                                    pathname: '/splash/location',
                                                    state: { groupId: groupId }
                                                })
                                            }
                                        })
                                        .catch(error => {
                                            dispatch((createUserGroupFailure(error)));
                                        });
                                }
                                else {
                                    dispatch((createUserGroupFailure(error)));
                                }
                            })
                            .catch(error => {
                                dispatch((createUserGroupFailure(error)));
                            });

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

const createUserGroupSuccess = (response, groupId) => {
    return {
        type: actionTypes.CREATE_USER_GROUP_SUCCESS,
        response: response,
        groupId: groupId
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

const updateUserGroup = (userGroupId, data) => {
    return dispatch => {
        userGroupService.updateUserGroup(userGroupId, data)
            .then(response => {
                dispatch(updateUserGroupSuccess(userGroupId));
            })
            .catch(error => {
                dispatch(updateUserGroupFailed(error));
            })
    }
}

const updateUserGroupSuccess = (userGroupId) => {
    return {
        type: actionTypes.UPDATE_USER_GROUP_SUCCESS
    };
};

const updateUserGroupFailed = (error) => {
    return {
        type: actionTypes.UPDATE_USER_GROUP_FAILURE,
        errorObj: error,
        error: true
    };
};

const cleanFlags = () => {
    return {
        type: actionTypes.USER_GROUP_CLEAN_FLAGS
    }
}

export const userGroupActions = {
    createUserGroup,
    updateUserGroup,
    cleanFlags
};





