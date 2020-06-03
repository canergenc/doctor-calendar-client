import request from '../hoc/Config/apiCentral';

const getGroupSettings = (filterData) => {
    return request({
        url: '/group-settings',
        method: 'GET',
        params: filterData
    });
};

const createGroupSettings = (data) => {
    return request({
        url: '/group-settings',
        method: 'POST',
        data: data
    });
};

const updateGroupSettings = (groupSettingsId, data) => {
    return request({
        url: '/group-settings/' + groupSettingsId,
        method: 'PATCH',
        data: data
    });
};

const deleteGroupSettings = (groupSettingsId) => {
    return request({
        url: '/group-settings/' + groupSettingsId,
        method: 'DELETE'
    });
};

export const groupSettingsService = {
    getGroupSettings,
    createGroupSettings,
    updateGroupSettings,
    deleteGroupSettings
};