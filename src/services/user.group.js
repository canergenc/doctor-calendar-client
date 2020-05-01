import request from '../hoc/Config/apiCentral';
import { helperService } from './helper';

const createUserGroup = (userId) => {
    console.log("create user group");

    return request({
        url: `/user-groups`,
        method: 'POST',
        data: {
            'userId': userId,  //  Zorunlu alan olması önemli değil // Caner_Genç_Çalışan_Grup
            'groupId': helperService.getGroupId(),
        }
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
    deleteUserGroup,
    createUserGroupBulk
};