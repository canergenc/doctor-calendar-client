import * as actionTypes from '../actions/actionTypes';

const initialState = {
    locations: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.Type) {
        case actionTypes.SET_LOCATIONS:
            return {
                ...state,
                locations: action.locations,
                error: false
            };
        case actionTypes.FETCH_LOCATIONS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;