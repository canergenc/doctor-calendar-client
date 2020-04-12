import * as actionTypes from '../actions/actionTypes';

const initialState = {
    locations: null,
    activeLocationId: null,
    error: false
};
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
const reorderLocation = (state, action) => {
    const result = Array.from(state.locations);
    const [removed] = result.splice(action.startIndex, 1);
    result.splice(action.endIndex, 0, removed);
    const updatedState = {
        locations: result,
    }

    return updateObject(state.locations, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOCATIONS:
            return {
                locations: action.locations,
                error: false
            };
        case actionTypes.SET_ACTIVE_LOCATION_ID:
            return {
                ...state,
                activeLocationId: action.activeLocationId,
                error: false
            };
        case actionTypes.REORDER_LOCATION: return reorderLocation(state, action);
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