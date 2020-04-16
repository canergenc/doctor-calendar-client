import request from "../hoc/Config/apiCentral";


const getCalendarsCount = (filterData) => {
    return request({
        url: '/calendars/count',
        method: 'GET',
        params: filterData
    });
};

const getReminderService = (filterData) => {
    return request({
        url: '/calendars',
        method: 'GET',
        params: filterData
    });
};

const reminderBulkUpdateService = (filterData, data) => {
    return request({
        url: '/calendars',
        method: 'PATCH',
        params: filterData,
        data: data
    });
};

const createReminderService = (data) => {
    return request({
        url: '/calendars',
        method: 'POST',
        data: data
    });
};

const updateReminderService = (id, data) => {
    return request({
        url: '/calendars/' + id,
        method: 'PATCH',
        data: data
    });
};

const deleteReminderService = (id) => {
    return request({
        url: '/calendars/' + id,
        method: 'DELETE'
    });
};

const createReminderBulk = (data) => {
    return request({
      url: "/calendars/bulk",
      method: "POST",
      data: data,
    });
  };

export const calendarService = {
    getReminderService,
    createReminderService,
    deleteReminderService,
    updateReminderService,
    reminderBulkUpdateService,
    createReminderBulk,
    getCalendarsCount
};




