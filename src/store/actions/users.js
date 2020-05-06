import * as actionTypes from './actionTypes';
import { userService } from '../../services/user';
import { userGroupService } from "../../services/user.group";
import { helperService } from '../../services';

export const setUsers = (users, defaultUsers) => {
    return {
        type: actionTypes.SET_USERS,
        users: users,
        defaultUsers: defaultUsers
    };
};

export const setGroupUsersCount = (count) => {
    return {
        type: actionTypes.SET_GROUP_USERS_COUNT,
        groupUsersCount: count
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

export const getGroupUsersCount = () => {
    return dispatch => {
        const filterData = {

            where: {
                groupId: {
                    like: helperService.getGroupId()
                }
            },
            include: [
                { relation: "user" }
            ]

        }
        userService.getGroupUsersCount(filterData)
            .then(res => {

                dispatch(setGroupUsersCount(res.count));
            })
    }
}

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

export const findUser = (filterKey, users) => {
    return dispatch => {
        if (filterKey.length > 2) {
            if (filterKey && filterKey.trim() !== "") {
                const filterData = {
                    filter: {
                        where: {
                            email: {
                                like: filterKey
                            },
                            isActive: true
                        }
                    }
                }

                userService.getGlobalUsers(filterData)
                    .then(res => {
                        const globalUsers = [];
                        res.forEach(element => {
                            if (element) {
                                let isExist = false;
                                users.forEach(localUser => {
                                    if (localUser.user) {
                                        if (localUser.user.id === element.id) {
                                            isExist = true;
                                        }
                                    }
                                })
                                if (!isExist) {
                                    globalUsers.push({
                                        value: element.id,
                                        label: element.fullName + " - " + element.email
                                    });
                                }
                            }
                        });

                        dispatch(setGlobalUsers(globalUsers));;
                    })
                    .catch(err => {
                        dispatch(fetchGlobalUsersFailed());
                    });
            }
        }
        else {
            const users = [];
            dispatch(setGlobalUsers(users));;
        }
    }
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


export const createUserGroupBulk = (userGroupBulk) => {
    return dispatch => {
        dispatch(createUserGroupBulkRequest());

        userGroupService.createUserGroupBulk(userGroupBulk)
            .then((response) => {
                const filterData = {
                    filter: {
                        where: {
                            groupId: {
                                like: helperService.getGroupId()
                            }
                        },
                        include: [
                            {
                                relation: "user"
                            }
                        ]
                    }
                };
                dispatch(getUsers(filterData));
                dispatch(createUserGroupBulkSuccess(response));
            })
            .catch((error) => {
                dispatch((createUserGroupBulkFailure(error)));
            });
    }
}


export const createUserGroupBulkRequest = () => {
    return {
        type: actionTypes.CREATE_USERGROUPBULK_REQUEST,
    };
};

export const createUserGroupBulkSuccess = (response) => {
    return {
        type: actionTypes.CREATE_USERGROUPBULK_SUCCESS,
        response: response
    };
}

export const createUserGroupBulkFailure = (err) => {

    return {
        type: actionTypes.CREATE_USERGROUPBULK_FAILURE,
        errorObj: err,

    };
}

export const cleanFlags = () => {
    return {
        type: actionTypes.USER_CLEAN_FLAGS
    }
}