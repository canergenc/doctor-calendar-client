import request from "../hoc/Config/apiCentral";


export const login = (email, password) => {
    return request({
        url: `/users/login`,
        method: 'POST',
        data: {
            'email': email,
            'password': password
        }
    });
}


export const register = (email, fullName, password, title) => {
    return request({
        url: `/users`,
        method: 'POST',
        data: {
            'email': email,
            'password': password,
            'fullName': fullName,
            "deviceId": "QWE123",
            "title": title
        }
    });
}



//return userId and name 
export const userMe = () => {
    return request({
        url: `/users/me`,
        method: 'GET',
        data: null
    },true);
}


export const userInfo = (id) => {
    return request({
        url: `/users/${id}`,
        method: 'GET',
        data:null
    },true);
}


export const userService = {
    login,
    register,
    userMe,
    userInfo
};




