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