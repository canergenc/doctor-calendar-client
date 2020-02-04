import * as actionTypes from "./actionTypes";
import Api from '../../api';

export const setReminders = (reminders) => {
  return {
    type: actionTypes.SET_REMINDERS,
    reminders: reminders
  };
};

export const fetchRemindersFailed = (error) => {
  return {
    type: actionTypes.FETCH_REMINDERS_FAILED
  };
};

export const initReminders = () => {
  return dispatch => {
    Api.get('/locations.json')
      .then(res => {
        const reminders = []
        if (res.data) {
          res.data.forEach(element => {
            if (element !== null) {
              if (element.calendar && element.calendar.length > 0) {
                reminders.push(element);
              }
            }
          });
          dispatch(setReminders(reminders));
        }
      })
      .catch(err => {
        dispatch(fetchRemindersFailed());
      });
  }
}

export const createReminderSuccess = (id, reminderData) => {
  return {
      type: actionTypes.CREATE_REMINDER_SUCCESS,
      reminderId: id,
      reminderData: reminderData
  };
};

export const createReminderFailed = (error) => {
  return {
      type: actionTypes.CREATE_REMINDER_FAIL,
      error: error
  };
};

export const createReminder = (reminderData) => {
  return dispatch => {
    axios.post('/locations.json', reminderData)
      .then(response => {
        console.log(response.data);
        dispatch(createReminderSuccess(response.data, reminderData));
      })
      .catch(error => {
        dispatch(createReminderFailed(error));
      });
  };
}
