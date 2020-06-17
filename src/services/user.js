import request from "../hoc/Config/apiCentral";

const getGroupUsersCount = (filterData) => {
    return request({
        url: '/user-groups/count',
        method: 'GET',
        params: filterData
    });
};

const getUsers = (filterData) => {
    return request({
        url: '/user-groups',
        method: 'GET',
        params: filterData
    });
};

const getGlobalUsers = (filterData) => {
    return request({
        url: '/users',
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
    });
};

const userInfo = (id) => {
    return request({
        url: `/users/${id}`,
        method: 'GET',
        data: null
    });
};

const createUserService = (data) => {
    return request({
        url: '/users',
        method: 'POST',
        data: data
    });
};

const updateUserService = (id, data) => {
    return request({
        url: '/users/' + id,
        method: 'PATCH',
        data: data
    });
};

const deleteUserService = (id) => {
    return request({
        url: '/users/' + id,
        method: 'DELETE'
    })
};

const emailCheckService = (email) => {
    return request({
        url: '/users',
        method: 'GET',
        email: email
    });
};

export const userService = {
    getUsers,
    getGlobalUsers,
    getGroupUsersCount,
    userMe,
    userInfo,
    emailCheckService,
    createUserService,
    updateUserService,
    deleteUserService
};