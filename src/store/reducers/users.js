import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: null,
    globalUsers: null,
    error: false,
    globalUsersError:false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.users,
                defaultUsers: action.defaultUsers,
                error: false
            };
        case actionTypes.FETCH_USERS_FAILED:
            return {
                ...state,
                error: true
            };
        case actionTypes.SET_GLOBAL_USERS:
            return {
                ...state,
                globalUsers: action.globalUsers,
                globalUsersError: false
            };
        case actionTypes.FETCH_GLOBAL_USERS_FAILED:
            return {
                ...state,
                globalUsersError: true
            };
        default:
            return state;
    }
}

export default reducer;