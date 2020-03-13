import request from '../hoc/Config/apiCentral';

const createGroup = (name) => {
    return request({
        url: `/groups`,
        method: 'POST',
        data: {
            'name': name,  //  Zorunlu alan olması önemli değil // Caner_Genç_Çalışan_Grup
        }
    });
};



export const groupService = {
    createGroup
};