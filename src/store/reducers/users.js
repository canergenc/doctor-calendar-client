import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: null,
    error: false
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
        default:
            return state;
    }
}

export default reducer;