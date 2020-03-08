import request from "../hoc/Config/apiCentral";

const getUsers = (filterData) => {
    return request({
        url: '/user-groups',
        method: 'GET',
        params: filterData
    });
};

//return userId and name 
const userMe = () => {
    return request({
        url: `/users/me`,
        method: 'GET',
        data: null
    }, true);
};

const userInfo = (id) => {
    return request({
        url: `/users/${id}`,
        method: 'GET',
        data: null
    }, true);
};

export const userService = {
    getUsers,
    userMe,
    userInfo
};