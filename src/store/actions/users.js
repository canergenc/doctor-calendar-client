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


export const setUserCount = (userId) => {
    console.log("set User Count:" + userId);

    return dispatch => {
        dispatch(setUserCountSuccess(userId))
    };
};

export const setUserCountSuccess = (userId) => {
    return {
        type: actionTypes.SET_USER_COUNT,
        userId: userId
    }
}

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
                            ...element,
                            count: 0
                        });
                    }
                });
                console.log(users);

                dispatch(setUsers(users, users));
            })
            .catch(err => {
                dispatch(fetchUsersFailed());
            });
    }
};

export const searchUser = (filterKey, defaultUsers) => {
    let users = null;
    if (filterKey.length > 2) {
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

export const findUser = (filterKey) => {
    return dispatch => {
        if (filterKey.length > 2) {
            if (filterKey && filterKey.trim() !== "") {
                const filterData = {
                    filter: {
                        where: {
                            email: {
                                like: filterKey
                            }
                        }
                    }
                }

                userService.getGlobalUsers(filterData)
                    .then(res => {
                        const users = [];
                        res.forEach(element => {

                            if (element) {
                                users.push({
                                    value: element.id,
                                    label: element.fullName
                                });
                            }
                        });

                        dispatch(setGlobalUsers(users));;
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


export const deleteUser = (userId) => {
    return dispatch => {
        userService.deleteUserService(userId).then(result => {
            dispatch(deleteUserSuccess(userId));
            const filterData = {
                filter: {
                    where: {
                        groupId: {
                            like: helperService.getGroupId()
                        }
                    },
                    include: [
                        { relation: "user" }
                    ]
                }
            };
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

export const createUser = (userData) => {
    return dispatch => {
        userService.createUserService(userData)
            .then(response => {
                dispatch(createUserSuccess(response.id, userData));
                dispatch(userGroupService.createUserGroup(response.id));
                const filterData = {
                    filter: {
                        where: {
                            groupId: {
                                like: helperService.getGroupId()
                            }
                        },
                        include: [
                            { relation: "user" }
                        ]
                    }
                };
                dispatch(getUsers(filterData));
            })
            .catch(error => {
                dispatch(createUserFailed(error))
            });
    };
};

export const createUserSuccess = (id, userData) => {
    return {
        type: actionTypes.CREATE_USER_SUCCESS,
        userId: id,
        userData: userData
    };
};

export const createUserFailed = (error) => {
    return {
        type: actionTypes.CREATE_USER_FAIL,
        error: error
    };
};

export const updateUser = (userId, userData) => {
    return dispatch => {
        userService.updateUserService(userId, userData)
            .then(response => {
                dispatch(updateUserSuccess(response.data.id, userData));
                const filterData = {
                    filter: {
                        where: {
                            groupId: {
                                like: helperService.getGroupId()
                            }
                        },
                        include: [
                            { relation: "user" }
                        ]
                    }
                };
                dispatch(getUsers(filterData));
            })
            .catch(error => {
                dispatch(updateUserFailed(error))
            });
    };
};

export const updateUserSuccess = (id, userData) => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        userId: id,
        userData: userData
    };
};

export const updateUserFailed = (error) => {
    return {
        type: actionTypes.UPDATE_USER_FAIL,
        error: error
    };
};