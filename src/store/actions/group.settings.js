import * as actionTypes from './actionTypes';
import { helperService } from "../../services/helper";
import { groupSettingsService } from '../../services/index';

export const getGroupSettings = () => {
    return dispatch => {
        const filterData = {
            filter: {
                where: {
                    groupId: {
                        like: helperService.getGroupId()
                    }
                }
            }
        }
        groupSettingsService.getGroupSettings(filterData)
            .then(response => {
                if(response.length>0){
                    dispatch(getGroupSettingsSuccess(response[0]));
                }
                else{
                    dispatch(getGroupSettingsFailed(error));    
                }
            })
            .catch(error => {
                dispatch(getGroupSettingsFailed(error))
            });
    };
};

export const getGroupSettingsSuccess = (data) => {
    return {
        type: actionTypes.GET_GROUPSETTINGS_SUCCESS,
        groupSettings: data
    };
};

export const getGroupSettingsFailed = (error) => {
    return {
        type: actionTypes.GET_GROUPSETTINGS_FAIL,
        errorObj: error
    };
};

export const updateGroupSettings = (groupSettingsId, data) => {
    return dispatch => {
        groupSettingsService.updateGroupSettings(groupSettingsId, data)
            .then(response => {
                dispatch(getGroupSettings());
                dispatch(updateGroupSettingsSuccess());
            })
            .catch(error => {
                dispatch(updateGroupSettingsFailed(error))
            });
    };
};

export const updateGroupSettingsSuccess = () => {
    return {
        type: actionTypes.UPDATE_GROUPSETTINGS_SUCCESS
    };
};

export const updateGroupSettingsFailed = (error) => {
    return {
        type: actionTypes.UPDATE_GROUPSETTINGS_FAIL,
        errorObj: error
    };
};

export const cleanFlagsGroupSettings = () => {
    return {
        type: actionTypes.GROUPSETTINGS_CLEAN_FLAGS
    };
};


export const getSeniority = () => {
    return dispatch => {
        const filterData = {
            filter: {
                where: {
                    groupId: {
                        like: helperService.getGroupId()
                    },
                    typeId:2
                }
            }
        }
        groupSettingsService.getSeniority(filterData)
            .then(response => {
                if(response.length>0){
                    dispatch(getSenioritySuccess(response[0]));
                }
                else{
                    dispatch(getSeniorityFailed(error));    
                }
            })
            .catch(error => {
                dispatch(getSeniorityFailed(error))
            });
    };
};

export const getSenioritySuccess = (data) => {
    return {
        type: actionTypes.GET_SENIORITY_SUCCESS,
        groupSettings: data
    };
};

export const getSeniorityFailed = (error) => {
    return {
        type: actionTypes.GET_SENIORITY_FAIL,
        errorObj: error
    };
};

export const updateSeniority = (seniorityId, data) => {
    return dispatch => {
        groupSettingsService.updateSeniority(seniorityId, data)
            .then(response => {
                dispatch(getSeniority());
                dispatch(updateSenioritySuccess());
            })
            .catch(error => {
                dispatch(updateSeniorityFailed(error))
            });
    };
};

export const updateSenioritySuccess = () => {
    return {
        type: actionTypes.UPDATE_SENIORITY_SUCCESS
    };
};

export const updateSeniorityFailed = (error) => {
    return {
        type: actionTypes.UPDATE_SENIORITY_FAIL,
        errorObj: error
    };
};

export const createSeniority = (data) => {
    return dispatch => {
        groupSettingsService.createSeniority(data)
            .then(response => {
                dispatch(getGroupSettings());
                dispatch(createSenioritySuccess());
            })
            .catch(error => {
                dispatch(createSeniorityFailed(error))
            });
    };
};

export const createSenioritySuccess = () => {
    return {
        type: actionTypes.CREATE_SENIORITY_SUCCESS
    };
};

export const createSeniorityFailed = (error) => {
    return {
        type: actionTypes.CREATE_SENIORITY_FAIL,
        errorObj: error
    };
};