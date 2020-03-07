import * as actionTypes from './actionTypes';
import {userService} from '../../services/user';

export const setUsers = (users, defaultUsers) => {
    return {
        type: actionTypes.SET_USERS,
        users: users,
        defaultUsers: defaultUsers
    };
};

export const fetchUsersFailed = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAILED
    };
};

export const getUsers = (filterData) => {
    return dispatch => {
        userService.getUsers(filterData)
            .then(res => {
                const users = [];
                res.forEach(element => {
                    users.push({
                        ...element
                    });
                });
                dispatch(setUsers(users, users));
            })
            .catch(err => {
                dispatch(fetchUsersFailed());
            });
    }
}

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