import * as actionTypes from '../actions/actionTypes';

const initialState = {
    locations: null,
    activeLocationId: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOCATIONS:
            return {
                ...state,
                locations: action.locations,
                error: false
            };
        case actionTypes.SET_ACTIVE_LOCATION_ID:
            return {
                ...state,
                activeLocationId: action.activeLocationId,
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