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
        crudSuccess: true,
        message: 'Kayıt güncellendi.'
    }
    return updateObject(state, updatedState);
};

const updateGroupSettingsFail = (state, action) => {
    const updatedState = {
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const groupSettingsCleanFlags = (state, action) => {
    const updatedState = {
        error: false,
        crudSuccess: false
    }
    return updateObject(state, updatedState);
};


const getSenioritySuccess = (state, action) => {
    const updatedState = {
        seniority: action.seniority,
        error: false,
        message: 'Kıdemlere ulaşıldı.'
    }
    return updateObject(state, updatedState);
};

const getSeniorityFail = (state, action) => {
    const updatedState = {
        error: true,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const createGroupSettingsSuccess = (state, action) => {

    const updatedState = {
        error: false,
        crudSuccess: true,
        message: 'Kayıt oluşturuldu.'
    }
    return updateObject(state, updatedState);
};

const createGroupSettingsFail = (state, action) => {
    const updatedState = {
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const deleteGroupSettingsSuccess = (state, action) => {

    const updatedState = {
        error: false,
        crudSuccess: true,
        message: 'Kayıt silindi.'
    }
    return updateObject(state, updatedState);
};

const deleteGroupSettingsFail = (state, action) => {
    const updatedState = {
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};

const getDefaultDaysSuccess = (state, action) => {
    const updatedState = {
        error: false,
        crudSuccess: false,
        seniorityDescription: action.defaultDays.name + ' : ' + action.defaultDays.start + ' ay ile ' + action.defaultDays.finish + ' ay arası',
        weekdayCountLimit: action.defaultDays.weekdayCountLimit,
        weekendCountLimit: action.defaultDays.weekendCountLimit,
        seniorityMonths: action.defaultDays.seniorityMonths,
    }
    return updateObject(state, updatedState);
};

const getDefaultDaysFail = (state, action) => {
    const updatedState = {
        error: true,
        crudSuccess: false,
        statusText: helperService.getErrorMessage(action.errorObj)
    }
    return updateObject(state, updatedState);
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GROUPSETTINGS_SUCCESS: return getGroupSettingsSuccess(state, action);
        case actionTypes.GET_GROUPSETTINGS_FAIL: return getGroupSettingsFail(state, action);
        case actionTypes.UPDATE_GROUPSETTINGS_SUCCESS: return updateGroupSettingsSuccess(state, action);
        case actionTypes.UPDATE_GROUPSETTINGS_FAIL: return updateGroupSettingsFail(state, action);
        case actionTypes.CREATE_GROUPSETTINGS_SUCCESS: return createGroupSettingsSuccess(state, action);
        case actionTypes.CREATE_GROUPSETTINGS_FAIL: return createGroupSettingsFail(state, action);
        case actionTypes.CREATE_SENIORITY_SUCCESS: return createGroupSettingsSuccess(state, action);
        case actionTypes.CREATE_SENIORITY_FAIL: return createGroupSettingsFail(state, action);
        case actionTypes.UPDATE_SENIORITY_SUCCESS: return updateGroupSettingsSuccess(state, action);
        case actionTypes.UPDATE_SENIORITY_FAIL: return updateGroupSettingsFail(state, action);
        case actionTypes.DELETE_GROUPSETTINGS_SUCCESS: return deleteGroupSettingsSuccess(state, action);
        case actionTypes.DELETE_GROUPSETTINGS_FAIL: return deleteGroupSettingsFail(state, action);
        case actionTypes.GET_SENIORITY_SUCCESS: return getSenioritySuccess(state, action);
        case actionTypes.GET_SENIORITY_FAIL: return getSeniorityFail(state, action);
        case actionTypes.GROUPSETTINGS_CLEAN_FLAGS: return groupSettingsCleanFlags(state, action);
        case actionTypes.GET_DEFAULT_DAYS_SUCCESS: return getDefaultDaysSuccess(state, action);
        case actionTypes.GET_DEFAULT_DAYS_FAIL: return getDefaultDaysFail(state, action);
        default:
            return state;
    }
}

export default reducer;