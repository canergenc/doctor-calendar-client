import * as actionTypes from '../actions/actionTypes';

const initialState = {
    status: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BULKLOCATION_REQUEST:
            return {
                ...state,
                status: action.status,
                error: false
            };
        case actionTypes.BULKLOCATION_SUCCESS:
            return {
                ...state,
                status: action.status,
                error: false
            };
        case actionTypes.BULKLOCATION_FAILURE:
            return {
                ...state,
                error: true,
                status: action.status
            }
        default:
            return state;
    }
}

export default reducer;