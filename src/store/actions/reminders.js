import * as actionTypes from "./actionTypes";
import { calendarService } from "../../services/calendar"


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
  const filterData = {
    filter: {
      include: [
        {
          relation: "location"
        }
      ]
    }
  }
  return dispatch => {
    calendarService.getReminderService(filterData)
      .then(res => {
        const reminders = []
        if (res) {
          console.log(res)
          res.forEach(element => {
            if (element !== null) {
              reminders.push(element);
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

export const getReminders = (filterData) => {
  return dispatch => {
    calendarService.getReminderService(filterData)
      .then(res => {
        const reminders = []
        if (res) {
          res.forEach(element => {
            if (element !== null) {
              reminders.push(element);
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
    calendarService.createReminderService(reminderData)
      .then((response) => {
        const filterData = {
          filter: {
            where: {
              locationId: {
                like: reminderData.locationId
              }
            },
            include: [
              {
                relation: "location"
              }
            ]
          }
        }
        dispatch(getReminders(filterData));
        dispatch(createReminderSuccess(response.data, reminderData));
      }).catch((error) => {
        dispatch(createReminderFailed(error));
      });
  };
}

export const deleteReminderSuccess = (id) => {
  return {
    type: actionTypes.DELETE_REMINDER_SUCCESS,
    reminderId: id
  };
};

export const deleteReminderFailed = (error) => {
  return {
    type: actionTypes.DELETE_REMINDER_FAIL,
    error: error
  };
};

export const deleteReminder = (reminderId) => {
  console.log(reminderId);

  return dispatch => {
    calendarService.deleteReminderService(reminderId)
      .then(response => {
        dispatch(deleteReminderSuccess(reminderId));
        dispatch(initReminders());
      })
      .catch(error => {
        dispatch(deleteReminderFailed(error));
      });
  };
}