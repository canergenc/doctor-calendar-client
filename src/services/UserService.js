import request from "../hoc/Config/apiCentral";


export const createReminderService = (data) => {
    return request({
        url: `/calendars`,
        method: 'POST',
        data: data
    });
}




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



export const register = (email, fullName, password) => {
    return request({
        url: `/users`,
        method: 'POST',
        data: {
            'email': email,
            'password': password,
            'fullName': fullName,
            "deviceId": "QWE123",
            "title": "DR"
        }
    });
}




