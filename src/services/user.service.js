import request from "../hoc/Config/apiCentral";


const login = (email, password) => {
    return request({
        url: `/users/login`,
        method: 'POST',
        data: {
            'email': email,
            'password': password
        }
    });
}



const register = (email, fullName, title, password, ) => {
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

export const userService = {
    login,
    register
};




