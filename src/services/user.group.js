import request from '../hoc/Config/apiCentral';

const createUserGroup = (userId) => {
    console.log("create user group");
    
    return request({
        url: `/user-groups`,
        method: 'POST',
        data: {
            'userId': userId,  //  Zorunlu alan olması önemli değil // Caner_Genç_Çalışan_Grup
            'groupId': "5e81d18363226a009965dd49"
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

export const userGroupService = {
    createUserGroup,
    createUserGroupBulk
};