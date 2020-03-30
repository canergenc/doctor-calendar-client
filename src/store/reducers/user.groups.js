import * as actionTypes from '../actions/actionTypes';

const initialState = {
    groups: null,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATEUSERGROUP_SUCCESS:
            return {
                ...state,
                error: false
            };
        case actionTypes.CREATEUSERGROUP_FAILURE:
            return {
                ...state,
                error: true
            };
        case actionTypes.CREATE_USERGROUPBULK_SUCCESS:
            return {
                ...state,
                error: false
            };
        case actionTypes.CREATE_USERGROUPBULK_FAILURE:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;