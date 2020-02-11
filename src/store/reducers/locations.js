import * as actionTypes from '../actions/actionTypes';

const initialState = {
    locations: null,
    activeLocationName: null,
    activeLocationId: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOCATIONS:
            return {
                ...state,
                locations: action.locations,
                activeLocationName: action.locations[0].name,
                activeLocationId: action.locations[0].id,
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