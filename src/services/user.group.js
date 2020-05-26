import request from '../hoc/Config/apiCentral';
import { helperService } from './helper';

const createUserGroup = (userId, countLimits) => {

    return request({
        url: `/user-groups`,
        method: 'POST',
        data: {
            'userId': userId,  //  Zorunlu alan olması önemli değil // Caner_Genç_Çalışan_Grup
            ...(countLimits.weekdayCountLimit ? { 'weekdayCountLimit': parseInt(countLimits.weekdayCountLimit) } : null),
            ...(countLimits.weekendCountLimit ? { 'weekendCountLimit': parseInt(countLimits.weekendCountLimit) } : null),
            'groupId': helperService.getGroupId(),
        }
    });
};


const updateUserGroup = (userGroupId, data) => {
    return request({
        url: '/user-groups/' + userGroupId,
        method: 'PATCH',
        data: data
    });
};

const createUserGroupBulk = (data) => {

    return request({
        url: `/user-groups/bulk`,
        method: 'POST',
        data: data
    });
};

const deleteUserGroup = (userGroupId) => {

    return request({
        url: '/user-groups/' + userGroupId,
        method: 'DELETE'
    });
};

export const userGroupService = {
    createUserGroup,
    updateUserGroup,
    deleteUserGroup,
    createUserGroupBulk
};