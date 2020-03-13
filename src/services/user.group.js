import request from '../hoc/Config/apiCentral';

const createUserGroup = (userId, groupId) => {
    return request({
        url: `/user-groups`,
        method: 'POST',
        data: {
            'userId': userId,  //  Zorunlu alan olması önemli değil // Caner_Genç_Çalışan_Grup
            'groupId': groupId
        }
    });
};


export const userGroupService = {
    createUserGroup
};