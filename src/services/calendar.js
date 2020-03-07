import request from "../hoc/Config/apiCentral";


const createReminderService = (data) => {
    return request({
        url: `/calendars`,
        method: 'POST',
        data: data
    });
}


export const  calendarService = {
    createReminderService
};




