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

export const register = (email, fullName, password) => {
    return request({
        url: `/users`,
        method: 'POST',
        data: {
            'email': email,
            'password': password,
            'fullName': fullName,
            "deviceId": "QWE123",
            "platform":1
        }
    },false);
};

const forgotPassword = (email) => {
    return request({
        url: `/users/forgot`,
        method: 'GET',
        params: {
            email:email
        }
    });
};


export const resetPassword = (email,password,token) => {
    return request({
        url: `/users/resetPassword/${token}`,
        method: 'POST',
        data: {
            'email': email,
            'password': password,      
        }
    },false);
};





export const authService = {
    login,
    register,
    forgotPassword,
    resetPassword
};