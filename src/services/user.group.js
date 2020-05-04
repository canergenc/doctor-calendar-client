import request from '../hoc/Config/apiCentral';
import { helperService } from './helper';

const createUserGroup = (userId, countLimits) => {
    console.log("create user group");

    return request({
        url: `/user-groups`,
        method: 'POST',
        data: {
            'userId': userId,  //  Zorunlu alan olması önemli değil // Caner_Genç_Çalışan_Grup
            'weekdayCountLimit': parseInt(countLimits.weekdayCountLimit),
            'weekendCountLimit': parseInt(countLimits.weekendCountLimit),
            'groupId': helperService.getGroupId(),
        }
    });
};


const updateUserGroup = (userGroupId, data) => {
    console.log("update user group");

    return request({
        url: '/user-groups/' + userGroupId,
        method: 'PATCH',
        data: data
    });
};

const createUserGroupBulk = (data) => {
    console.log("create user group");

    return request({
        url: `/user-groups/bulk`,
        method: 'POST',
        data: data
    });
};

const deleteUserGroup = (userGroupId) => {
    console.log("delete user group");

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