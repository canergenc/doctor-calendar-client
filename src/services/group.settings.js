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

const getSeniority = (filterData) => {
    return request({
        url: '/group-settings',
        method: 'GET',
        params: filterData
    });
};

const createSeniority = (data) => {
    return request({
        url: '/group-settings',
        method: 'POST',
        data: data
    });
};

const updateSeniority = (seniorityId, data) => {
    return request({
        url: '/group-settings/' + seniorityId,
        method: 'PATCH',
        data: data
    });
};

export const groupSettingsService = {
    getGroupSettings,
    createGroupSettings,
    updateGroupSettings,
    getSeniority,
    createSeniority,
    updateSeniority
};