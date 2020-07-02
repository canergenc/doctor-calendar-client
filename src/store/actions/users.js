import * as actionTypes from './actionTypes';
import { userService } from '../../services/user';
import { userGroupService } from "../../services/user.group";
import { helperService, groupSettingsService } from '../../services';
import moment from 'moment';

export const setUsers = (users, defaultUsers) => {
    return {
        type: actionTypes.SET_USERS,
        users: users,
        defaultUsers: defaultUsers,
        defaultUsersCount: defaultUsers.length,
        usersCount: users.length,

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

export const getGroupUsersCount = (filterData) => {
    return dispatch => {

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
                        if (!element.user.workStartDate) {
                            element.user.workStartDate = moment().format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]")
                        }
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


export const deleteUserGroup = (userGroupId, filterData, users, defaultUsers) => {

    return dispatch => {
        userGroupService.deleteUserGroup(userGroupId).then(result => {




            let defIndex = defaultUsers.findIndex(u => u.id == userGroupId);
            if (defIndex > -1) {
                defaultUsers.splice(defIndex, 1);
            }



            let userIndex = users.findIndex(u => u.id == userGroupId);
            if (userIndex > -1) {
                users.splice(userIndex, 1);

            }

            dispatch(deleteUserGroupSuccess(userGroupId, users, defaultUsers));
        }).catch(error => {
            dispatch(deleteUserFailed(error));
        });
    };
};

export const deleteUserGroupSuccess = (id, users, defaultUsers) => {
    return {
        type: actionTypes.DELETE_USER_GROUP_SUCCESS,
        userId: id,
        users: users,
        defaultUsers: defaultUsers,
        usersCount: users.length,
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

export const updateUser = (userId, userData, userGroupId, countLimits, listOfUser) => {
    return dispatch => {
        userService.updateUserService(userId, userData)
            .then(response => {
                userGroupService.updateUserGroup(userGroupId, countLimits)
                    .then(response => {

                        listOfUser.map((u) => {
                            if (u.user.id == userId) {
                                u.user.email = userData.email
                                u.user.fullName = userData.fullName
                                u.user.workStartDate = userData.workStartDate
                                u.weekdayCountLimit = countLimits.weekdayCountLimit
                                u.weekendCountLimit = countLimits.weekendCountLimit

                            }
                        })

                        dispatch(updateUserSuccess(userId, userData, listOfUser))
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

export const updateUserSuccess = (id, userData, users) => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        userId: id,
        userData: userData,
        users: users
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
        errorObj: err
    };
}

export const cleanFlagsUsers = () => {
    return {
        type: actionTypes.USER_CLEAN_FLAGS
    }
}

export const updateUserWeekdayCount = (userId, userData, userGroupId, listOfUser) => {
    return dispatch => {
        const filterData = {
            filter: {
                where: {
                    and: [{
                        groupId: {
                            like: helperService.getGroupId()
                        }
                    },
                    {
                        type: 2

                    }
                        ,
                    {
                        start: {
                            'lte': userData.seniority
                        }
                    },
                    {
                        finish: {
                            'gte': userData.seniority
                        }
                    }
                    ]
                }
            }
        }
        groupSettingsService.getGroupSettings(filterData)
            .then(resp => {
                if (resp.length > 0) {

                    const countLimits = {
                        weekdayCountLimit: resp[0].defaultWeekDayDutyLimit,
                        weekendCountLimit: resp[0].defaultWeekEndDutyLimit
                    };
                    
                    userGroupService.updateUserGroup(userGroupId, countLimits)
                        .then(response => {

                            listOfUser.map((u) => {
                                if (u.user.id == userId) {
                                    u.user.email = userData.email
                                    u.user.fullName = userData.fullName
                                    u.user.workStartDate = userData.workStartDate
                                    u.weekdayCountLimit = countLimits.weekdayCountLimit
                                    u.weekendCountLimit = countLimits.weekendCountLimit

                                }
                            })

                            dispatch(updateUserWeekdaySuccess(userId, userData, listOfUser))
                        })
                        .catch(err => {
                            dispatch(updateUserFailed(err));
                        });
                }
                else {
                    dispatch(updateUserWeekdayFailed());
                }
            })


    };
};

export const updateUserWeekdaySuccess = (id, userData, users) => {
    return {
        type: actionTypes.UPDATE_USER_WEEKDAY_SUCCESS,
        userId: id,
        userData: userData,
        users: users
    };
};

export const updateUserWeekdayFailed = () => {
    return {
        type: actionTypes.UPDATE_USER_WEEKDAY_FAIL,
        error: true
    };
};

export const emailCheck = (email) => {
    return dispatch => {
        userService.emailCheckService(email)
            .then(response => {
                dispatch(emailCheckSuccess());
            })
            .catch(error => {
                dispatch(emailCheckFailed(error));
            });
    };
};

export const emailCheckSuccess = (id, userData, users) => {
    return {
        type: actionTypes.EMAIL_CHECK_SUCCESS
    };
};

export const emailCheckFailed = (error) => {
    return {
        type: actionTypes.EMAIL_CHECK_FAIL,
        errorObj: error,
        error: true
    };
};