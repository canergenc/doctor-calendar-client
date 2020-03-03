import * as actionTypes from "./actionTypes";
import Api from '../../api';
import { createReminderService } from "../../services"


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
    params: {
      filter: {
        include: [
          {
            relation: "location"
          }
        ]
      }
    }
  }
  return dispatch => {
    Api.get('/calendars', filterData)
      .then(res => {
        const reminders = []
        if (res.data) {
          res.data.forEach(element => {
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


export const getReminders = (locationId) => {
  const filterData = {
    params: {
      filter: {
        where: {
          locationId: {
            like: locationId
          }
        },
        include: [
          {
            relation: "location"
          }
        ]
      }
    }
  }
  return dispatch => {
    Api.get('/calendars', filterData)
      .then(res => {
        const reminders = []
        if (res.data) {
          res.data.forEach(element => {
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

  console.log('in foo', error);
  return {
    type: actionTypes.CREATE_REMINDER_FAIL,
    error: error
  };
};

export const createReminderOld = (reminderData) => {
  return dispatch => {
    Api.post('/calendars', reminderData)
      .then(response => {
        dispatch(getReminders(response.data.locationId));
        dispatch(createReminderSuccess(response.data, reminderData));
      })
      .catch(error => {
        dispatch(createReminderFailed(error));
      });
  };
}


export const createReminder = (reminderData) => {
  return dispatch => {
    createReminderService(reminderData).then((response) => {
      dispatch(getReminders(response.data.locationId));
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
  return dispatch => {
    Api.delete('/calendars/' + reminderId)
      .then(response => {
        dispatch(deleteReminderSuccess(reminderId));
        dispatch(initReminders());
      })
      .catch(error => {
        dispatch(deleteReminderFailed(error));
      });
  };
}