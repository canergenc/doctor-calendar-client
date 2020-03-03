import request from "../hoc/Config/apiCentral";


export const createReminderService = (data) => {
    return request({
        url: `/calendars`,
        method: 'POST',
        data: data
    });
}




