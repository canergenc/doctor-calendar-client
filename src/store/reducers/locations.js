import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { helperService } from "../../services/helper";

const initialState = {
    locations: null,
    activeLocationId: null,
    error: false,
    crudSuccess: false
};

const setLocations = (state, action) => {
    const updatedState = {
        locations: action.locations,
        error: false,
        crudSuccess: false
    }
    return updateObject(state, updatedState);
};

const setActiveLocationId = (state, action) => {
    const updatedState = {
        activeLocationId: action.activeLocationId,
        error: false
    }
    return updateObject(state, updatedState);
};

const deleteLocationSuccess = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: false,
        crudSuccess: true,
        message:'Lokasyon silindi.'
    }
    return updateObject(state, updatedState);
};

const deleteLocationFail = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const createLocationSuccess = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: false,
        crudSuccess: true,
        message:'Lokasyon kaydedildi.'
    }
    return updateObject(state, updatedState);
};

const createLocationFail = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const updateLocationSuccess = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: false,
        crudSuccess: true,
        message: 'Lokasyon güncellendi.'
    }
    return updateObject(state, updatedState);
};

const updateLocationFail = (state, action) => {
    const updatedState = {
        locationId: action.locationId,
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
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

const fetchLocationsFailed = (state, action) => {
    return updateObject(state, { error: true, crudSuccess: false });
};

const cleanFlags = (state, action) => {
    return updateObject(state, { error: false, crudSuccess: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOCATIONS: return setLocations(state, action);
        case actionTypes.SET_ACTIVE_LOCATION_ID: return setActiveLocationId(state, action);
        case actionTypes.CREATE_LOCATION_SUCCESS: return createLocationSuccess(state, action);
        case actionTypes.CREATE_LOCATION_FAIL: return createLocationFail(state, action);
        case actionTypes.UPDATE_LOCATION_SUCCESS: return updateLocationSuccess(state, action);
        case actionTypes.UPDATE_LOCATION_FAIL: return updateLocationFail(state, action);
        case actionTypes.DELETE_LOCATION_SUCCESS: return deleteLocationSuccess(state, action);
        case actionTypes.DELETE_LOCATION_FAIL: return deleteLocationFail(state, action);
        case actionTypes.REORDER_LOCATION: return reorderLocation(state, action);
        case actionTypes.LOCATION_CLEAN_FLAGS: return cleanFlags(state, action);
        case actionTypes.FETCH_LOCATIONS_FAILED: return fetchLocationsFailed(state, action);
        default:
            return state;
    }
}

export default reducer;