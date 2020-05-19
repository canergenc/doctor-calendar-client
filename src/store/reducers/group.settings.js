import * as actionTypes from '../actions/actionTypes';
import { helperService } from "../../services/helper";
import { updateObject } from '../utility';

const initialState = {
    groupSettingsId: null,
    error: false

};

const getGroupSettingsSuccess = (state, action) => {
    
    const updatedState = {
        isWeekdayControl: action.groupSettings.isWeekdayControl,
        isWeekendControl: action.groupSettings.isWeekendControl,
        sequentialOrderLimitCount: action.groupSettings.sequentialOrderLimitCount,
        locationDayLimit: action.groupSettings.locationDayLimit,
        locationDayLimitCount: action.groupSettings.locationDayLimitCount,
        groupSettingsId: action.groupSettings.id,
        error: false,
        message: 'Ayarlara ulaşıldı.'
    }
    return updateObject(state, updatedState);
};

const getGroupSettingsFail = (state, action) => {
    const updatedState = {
        error: true,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const updateGroupSettingsSuccess = (state, action) => {
    const updatedState = {
        error: false,
        message: 'Ayarlar güncellendi.'
    }
    return updateObject(state, updatedState);
};

const updateGroupSettingsFail = (state, action) => {
    const updatedState = {
        error: true,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const groupSettingsCleanFlags = (state, action) => {
    const updatedState = {
        error: false
    }
    return updateObject(state, updatedState);
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GROUPSETTINGS_SUCCESS: return getGroupSettingsSuccess(state, action);
        case actionTypes.GET_GROUPSETTINGS_FAIL: return getGroupSettingsFail(state, action);
        case actionTypes.UPDATE_GROUPSETTINGS_SUCCESS: return updateGroupSettingsSuccess(state, action);
        case actionTypes.UPDATE_GROUPSETTINGS_FAIL: return updateGroupSettingsFail(state, action);
        case actionTypes.GROUPSETTINGS_CLEAN_FLAGS: return groupSettingsCleanFlags(state, action);
        default:
            return state;
    }
}

export default reducer;