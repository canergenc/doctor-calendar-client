import request from '../hoc/Config/apiCentral';

const createUserGroup = (userId) => {
    console.log("create user group");
    
    return request({
        url: `/user-groups`,
        method: 'POST',
        data: {
            'userId': userId,  //  Zorunlu alan olması önemli değil // Caner_Genç_Çalışan_Grup
            'groupId': "5e53975e62398900983c869c"
        }
    });
};


export const userGroupService = {
    createUserGroup
};