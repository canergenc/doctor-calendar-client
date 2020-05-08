import * as actionTypes from '../actions/actionTypes';
import { helperService } from "../../services/helper";

const initialState = {
    locations: null,
    activeLocationId: null,
    error: false,
    crudSuccess: false
};

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const deleteLocationSuccess = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: false,
        crud: true
    }
    return updateObject(state, updatedState);
};

const deleteLocationFail = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: true,
        crud: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};


const createLocationSuccess = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: false,
        crud: true
    }
    return updateObject(state, updatedState);
}
const createLocationFail = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: true,
        crud: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
}

const updateLocationSuccess = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: false,
        crud: true,
        message:'Bilgiler güncellendi.'
    }
    return updateObject(state, updatedState);
}
const updateLocationFail = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: true,
        crud: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
}


const reorderLocation = (state, action) => {
    const result = Array.from(state.locations);
    const [removed] = result.splice(action.startIndex, 1);
    result.splice(action.endIndex, 0, removed);
    const updatedState = {
        locations: result,
    }

    return updateObject(state.locations, updatedState);
};

const cleanFlags = (state, action) => {
    return updateObject(state, { error: false, crudSuccess: false });
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
        case actionTypes.CREATE_LOCATION_SUCCESS: return createLocationSuccess(state, action);
        case actionTypes.CREATE_LOCATION_FAIL: return createLocationFail(state, action);
        case actionTypes.UPDATE_LOCATION_SUCCESS: return updateLocationSuccess(state, action);
        case actionTypes.UPDATE_LOCATION_FAIL: return updateLocationFail(state, action);
        case actionTypes.DELETE_LOCATION_SUCCESS: return deleteLocationSuccess(state, action);
        case actionTypes.DELETE_LOCATION_FAIL: return deleteLocationFail(state, action);
        case actionTypes.REORDER_LOCATION: return reorderLocation(state, action);
        case actionTypes.LOCATION_CLEAN_FLAGS: return cleanFlags(state, action);
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