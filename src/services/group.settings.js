import request from '../hoc/Config/apiCentral';

const getGroupSettings = (filterData) => {
    return request({
        url: '/group-settings',
        method: 'GET',
        data: filterData
    });
};

const updateGroupSettings = (groupSettingsId, data) => {
    return request({
        url: '/group-settings/' + groupSettingsId,
        method: 'PATCH',
        data: data
    });
};

export const groupSettingsService = {
    getGroupSettings,
    updateGroupSettings
};