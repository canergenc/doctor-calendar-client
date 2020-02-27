import * as actionTypes from './actionTypes';
import Api from '../../api';

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

export const initUsers = () => {
    return dispatch => {
        Api.get('/users')
            .then(res => {
                const users = [];
                res.data.forEach(element => {
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
                        (row.fullName &&
                            row.fullName.toLowerCase().includes(filterKey.toLowerCase().trim()))
                    );
                })
        }
    }
    else if (filterKey.length <= 2) {
        users = defaultUsers;
    }

    return dispatch => { dispatch(setUsers(users, defaultUsers)); }

}