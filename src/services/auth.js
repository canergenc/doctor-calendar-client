import request from '../hoc/Config/apiCentral';

export const login = (email, password) => {
    return request({
        url: `/users/login`,
        method: 'POST',
        data: {
            'email': email,
            'password': password
        }
    },false);
};

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
    },false);
};

export const authService = {
    login,
    register
};