import * as actionTypes from './actionTypes';
import { userService } from '../../services/user';
import { userGroupService } from "../../services/user.group";
import { helperService } from '../../services';

export const setUsers = (users, defaultUsers) => {
    return {
        type: actionTypes.SET_USERS,
        users: users,
        defaultUsers: defaultUsers,
        defaultUsersCount:defaultUsers.length,
        usersCount:users.length,

    };
};

export const fetchUsersFailed = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAILED
    };
};

export const setGlobalUsers = (users) => {
    return {
        type: actionTypes.SET_GLOBAL_USERS,
        globalUsers: users
    };
};

export const fetchGlobalUsersFailed = (error) => {
    return {
        type: actionTypes.FETCH_GLOBAL_USERS_FAILED
    };
};

export const getUsers = (filterData) => {
    return dispatch => {
        userService.getUsers(filterData)
            .then(res => {
                const users = [];

                res.forEach(element => {
                    if (element.user) {
                        users.push({
                            ...element
                        });
                    }
                });


                users.sort(function (a, b) {
                    var dateA = new Date(a.user.workStartDate), dateB = new Date(b.user.workStartDate);
                    return dateA - dateB;
                });



                dispatch(setUsers(users, users));
            })
            .catch(err => {
                dispatch(fetchUsersFailed());
            });
    }
};

export const searchUser = (filterKey, defaultUsers) => {
    let users = null;
    if (filterKey.length > 1) {
        if (filterKey && filterKey.trim() !== "") {
            users = defaultUsers
                .filter(row => {
                    return (

                        row.user.email &&
                            row.user.email.toLowerCase().includes(filterKey.toLowerCase().trim())

                            ||

                        (row.user.fullName &&
                            row.user.fullName.toLowerCase().includes(filterKey.toLowerCase().trim()))
                    );
                })
        }
    }
    else if (filterKey.length <= 2) {
        users = defaultUsers;
    }

    return dispatch => { dispatch(setUsers(users, defaultUsers)); }
}

export const deleteUser = (userId, filterData) => {
    return dispatch => {
        userService.deleteUserService(userId).then(result => {
            dispatch(getUsers(filterData));
        }).catch(error => {
            dispatch(deleteUserFailed(error));
        });
    };
};

export const deleteUserSuccess = (id) => {
    return {
        type: actionTypes.DELETE_USER,
        userId: id
    };
};

export const deleteUserFailed = (error) => {
    return {
        type: actionTypes.DELETE_USER_FAIL,
        error: error
    };
};

export const deleteUserGroup = (userGroupId, filterData) => {
    return dispatch => {
        userGroupService.deleteUserGroup(userGroupId).then(result => {
            dispatch(getUsers(filterData));
            dispatch(deleteUserGroupSuccess(userGroupId));
        }).catch(error => {
            dispatch(deleteUserFailed(error));
        });
    };
};

export const deleteUserGroupSuccess = (id) => {
    return {
        type: actionTypes.DELETE_USER_GROUP_SUCCESS,
        userId: id
    };
};

export const deleteUserGroupFailed = (error) => {
    return {
        type: actionTypes.DELETE_USER_GROUP_FAIL,
        errorObj: error
    };
};

export const createUser = (userData, countLimits, filterData) => {
    return dispatch => {
        userService.createUserService(userData)
            .then(response => {

                userGroupService.createUserGroup(response.id, countLimits)
                    .then(
                        res => {
                            dispatch(getUsers(filterData));
                            dispatch(createUserSuccess(response.id))
                        }
                    )
                    .catch(errorUserGroup => {
                        dispatch(createUserFailed(errorUserGroup))
                    });
            })
            .catch(error => {
                dispatch(createUserFailed(error))
            });
    };
};

export const createUserSuccess = (id, userData) => {
    return {
        type: actionTypes.CREATE_USER_SUCCESS,
        userId: id
    };
};

export const createUserFailed = (error) => {
    return {
        type: actionTypes.CREATE_USER_FAIL,
        errorObj: error
    };
};

export const updateUser = (userId, userData, userGroupId,countLimits, filterData) => {
    return dispatch => {
        userService.updateUserService(userId, userData)
            .then(response => {
                userGroupService.updateUserGroup(userGroupId, countLimits)
                    .then(response => {
                        dispatch(getUsers(filterData));
                        dispatch(updateUserSuccess(userId))
                    })
                    .catch(err => {
                        dispatch(updateUserFailed(err));
                    })

            })
            .catch(error => {
                dispatch(updateUserFailed(error))
            });
    };
};

export const updateUserSuccess = (id) => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        userId: id
    };
};

export const updateUserFailed = (error) => {
    return {
        type: actionTypes.UPDATE_USER_FAIL,
        errorObj: error,
        error: true
    };
};

export const cleanFlagsUsers = () => {
    return {
        type: actionTypes.USER_CLEAN_FLAGS
    }
}