import * as actionTypes from "./actionTypes";
import { calendarService } from "../../services/calendar"




export const  updateBulkReminder = (filter,data) => {
  return dispatch => {
      dispatch(updateBulkReminderRequest());
      calendarService.reminderBulkUpdateService(filter,data)
          .then((response) => {
              dispatch(updateBulkReminderSuccess(response));
          }).catch((error) => {
              dispatch(updateBulkReminderFailure(error));
          });
  }
}


export const updateBulkReminderRequest = () => {
  return {
      type: actionTypes.CALENDAR_BULKUPDATE_REQUEST,
  };
};

export const updateBulkReminderSuccess = (response) => {
  return {
      type: actionTypes.CALENDAR_BULKUPDATE_SUCCESS,
      response: response
  };

}

export const updateBulkReminderFailure = (err) => {
  return {
      erorObj: err,
      type: actionTypes.CALENDAR_BULKUPDATE_FAILURE,
      statusCode: err.data.error.statusCode, // BadRequestError
      statusText: err.data.error.message,  // Invalid email or password
      statusName: err.data.error.name,   // BadRequestError

  };
}



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
              },
              groupId: {
                like: '5e53975e62398900983c869c'
              }
            },
            include: [
              {
                relation: "group"
              },
              {
                relation: "user"
              },
              {
                relation: "location"
              }
            ]
          }
        }
        dispatch(getReminders(filterData));
        dispatch(createReminderSuccess(response, reminderData));
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
    calendarService.deleteReminderService(reminderId)
      .then(response => {
        console.log("deleteReminder");
        console.log(response);

        dispatch(deleteReminderSuccess(reminderId));
        const filterData = {
          filter: {
            where: {
              groupId: {
                like: "5e53975e62398900983c869c"
              }
            },
            include: [
              {
                relation: "location"
              },
              {
                relation: "user"
              }
            ]
          }
        }
        dispatch(getReminders(filterData));
      })
      .catch(error => {
        dispatch(deleteReminderFailed(error));
      });
  };
}