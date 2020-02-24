import * as actionTypes from '../actions/actionTypes';

const initialState = {
    groups: null,
    activeGroupId: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GROUPS:
            return {
                ...state,
                groups: action.groups,
                activeGroupId: action.groups[0].id,
                error: false
            };
        case actionTypes.FETCH_GROUPS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;