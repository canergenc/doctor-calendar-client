import * as actionTypes from "./actionTypes";
import { calendarService } from "../../services/calendar"
import { helperService } from "../../services";
import { CalendarTypes } from "../../variables/constants";


export const cleanReminderError = () => {
  return {
    type: actionTypes.CLEAN_REMINDER_ERROR
  };
};

export const updateBulkReminder = (filter, data, waitingForApprovedFilter, approvedFilter) => {
  return dispatch => {
    dispatch(updateBulkReminderRequest());
    calendarService.reminderBulkUpdateService(filter, data)
      .then((response) => {
        dispatch(updateBulkReminderSuccess(response));
        dispatch(fetchWaitingForApproveReminders(waitingForApprovedFilter));
        dispatch(fetchApprovedReminders(approvedFilter));

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
  console.log(err)
  return {
    type: actionTypes.CALENDAR_BULKUPDATE_FAILURE,
    errorObj: err,

    // statusCode: err.data.error.statusCode, // BadRequestError
    // statusText: err.data.error.message,  // Invalid email or password
    // statusName: err.data.error.name,   // BadRequestError

  };
}

export const setReminders = (reminders, filterData) => {
  return {
    type: actionTypes.SET_REMINDERS,
    reminders: reminders,
    filterData: filterData
  };
};

export const fetchRemindersFailed = (error) => {
  return {
    type: actionTypes.FETCH_REMINDERS_FAILED,
    errorObj: error
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
          dispatch(setReminders(reminders, filterData));
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
    errorObj: error
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
                like: helperService.getGroupId()
              }
              ,
              type: CalendarTypes.Nobet
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
        dispatch(createReminderSuccess(response.id, reminderData));
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

export const deleteReminder = (reminderId, filterData) => {
  return dispatch => {
    calendarService.deleteReminderService(reminderId)
      .then(response => {

        dispatch(getReminders(filterData));
        dispatch(deleteReminderSuccess(reminderId));
      })
      .catch(error => {
        dispatch(deleteReminderFailed(error));
      });
  };
}

export const updateReminderStart = (index) => {
  return {
    type: actionTypes.UPDATE_REMINDER_START,
    index: index
  };
};

export const updateReminderSuccess = (id) => {
  return {
    type: actionTypes.UPDATE_REMINDER_SUCCESS,
    reminderId: id
  };
};

export const updateReminderFail = (error) => {
  return {
    type: actionTypes.UPDATE_REMINDER_FAIL,
    errorObj: error
  };
};

export const updateReminder = (id, index, reminderData, filterData) => {
  return dispatch => {
    dispatch(updateReminderStart(index));
    calendarService.updateReminderService(id, reminderData)
      .then(response => {
        dispatch(updateReminderSuccess(response.id));
        dispatch(getReminders(filterData));
      })
      .catch(error => {
        dispatch(updateReminderFail(error, index))
      });
  }
}

export const fetchWaitingForApproveReminders = (filter) => {
  return dispatch => {
    dispatch(fetchWaitingForApproveRemindersRequest());
    calendarService.getReminderService(filter)
      .then(res => {
        const reminders = []
        if (res) {
          res.forEach(element => {
            if (element !== null) {
              reminders.push(element);
            }
          });
          dispatch(fetchWaitingForApproveRemindersSuccess(reminders));
        }
      })
      .catch(err => {
        dispatch(fetchWaitingForApproveRemindersFailure(err));
      });
  }
}



export const fetchWaitingForApproveRemindersRequest = () => {
  return {
    type: actionTypes.WAITING_FOR_APPROVE_REMINDERS_REQUEST,
  };
};

export const fetchWaitingForApproveRemindersSuccess = (reminders) => {
  return {
    type: actionTypes.WAITING_FOR_APPROVE_REMINDERS_SUCCESS,
    status: true,
    waitingForApproveReminders: reminders
  };
}

export const fetchWaitingForApproveRemindersFailure = (err) => {
  return {
    type: actionTypes.WAITING_FOR_APPROVE_REMINDERS_FAILURE,
    erorObj: err,
    status: false,
  };
}



export const fetchApprovedReminders = (filter) => {
  return dispatch => {
    dispatch(fetchApprovedRemindersRequest());
    calendarService.getReminderService(filter)
      .then(res => {
        const reminders = []
        if (res) {
          res.forEach(element => {
            if (element !== null) {
              reminders.push(element);
            }
          });
          dispatch(fetchApprovedRemindersSuccess(reminders));
        }
      })
      .catch(err => {
        dispatch(fetchApprovedRemindersFailure(err));
      });
  }
}



export const fetchApprovedRemindersRequest = () => {
  return {
    type: actionTypes.APPROVED_REMINDERS_REQUEST,
  };
};

export const fetchApprovedRemindersSuccess = (reminders) => {
  return {
    type: actionTypes.APPROVED_REMINDERS_SUCCESS,
    status: true,
    approvedReminders: reminders
  };
}

export const fetchApprovedRemindersFailure = (err) => {
  return {
    type: actionTypes.APPROVED_REMINDERS_FAILURE,
    erorObj: err,
    status: false,
  };
}



export const createReminderBulk = (data) => {
  return dispatch => {
    dispatch(createReminderBulkRequest());
    calendarService.createReminderBulk(data)
      .then(response => {
        dispatch(createReminderBulkSuccess(response));
      })
      .catch(err => {
        dispatch(createReminderBulkFailure(err));
      });
  }
}



export const createReminderBulkRequest = () => {
  return {
    type: actionTypes.CREATE_CALENDARBULK_REQUEST,
  };
};

export const createReminderBulkSuccess = (response) => {
  return {
    type: actionTypes.CREATE_CALENDARBULK_SUCCESS,
    status: true,
    response: response
  };
}

export const createReminderBulkFailure = (err) => {
  return {
    type: actionTypes.CREATE_CALENDARBULK_FAILURE,
    erorObj: err,
    status: false,
  };
}





export const getRemindersCount = (data) => {
  return dispatch => {
    dispatch(getRemindersCountRequest());
    calendarService.getCalendarsCount(data)
      .then(response => {
        dispatch(getRemindersCountSuccess(response));
      })
      .catch(err => {
        dispatch(getRemindersCountFailure(err));
      });
  }
}



export const getRemindersCountRequest = () => {
  return {
    type: actionTypes.GET_CALENDARSCOUNT_REQUEST,
  };
};

export const getRemindersCountSuccess = (response) => {
  return {
    type: actionTypes.GET_CALENDARSCOUNT_SUCCESS,
    status: true,
    response: response.count
  };
}

export const getRemindersCountFailure = (err) => {
  return {
    type: actionTypes.GET_CALENDARSCOUNT_FAILURE,
    erorObj: err,
    status: false,
  };
}









