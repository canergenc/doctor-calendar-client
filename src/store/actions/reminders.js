import moment from "moment/moment";
import * as actionTypes from "./actionTypes";
import { calendarService } from "../../services/calendar"
import { helperService } from "../../services";
import { CalendarTypes } from "../../variables/constants";


export const cleanFlagsReminder = () => {
  return {
    type: actionTypes.REMINDER_CLEAN_FLAGS
  };
};

export const updateBulkReminder = (filter, data, waitingForApprovedFilter, approvedFilter) => {
  return dispatch => {
    dispatch(updateBulkReminderRequest());
    calendarService.reminderBulkUpdateService(filter, data)
      .then((response) => {
        dispatch(updateBulkReminderSuccess(response));
        // dispatch(fetchWaitingForApproveReminders(waitingForApprovedFilter));
        // dispatch(fetchApprovedReminders(approvedFilter));

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
    type: actionTypes.CALENDAR_BULKUPDATE_FAILURE,
    errorObj: err
  };
}

export const setReminders = (reminders, filterData, selectedLocations, selectedUsers) => {
  return {
    type: actionTypes.SET_REMINDERS,
    reminders: reminders,
    filterData: filterData,
    selectedLocations: selectedLocations,
    selectedUsers: selectedUsers
  };
};

export const setRemindersForCrud = (reminders, filterData) => {
  return {
    type: actionTypes.SET_REMINDERS_FOR_CRUD,
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

export const getReminders = (selectedLocations, selectedUsers, curMonth) => {

  const startOfMonth = moment(curMonth).startOf('month').format("YYYY-MM-DD[T]00:01:00.000[Z]");
  const endOfMonth = moment(curMonth).endOf('month').format("YYYY-MM-DD[T]23:59:59.000[Z]");

  let locations = [];
  if (selectedLocations) {
    selectedLocations.forEach(location => {
      locations.push({ locationId: { like: location } })
    });
  }

  let users = [];
  if (selectedUsers) {
    selectedUsers.forEach(user => {
      users.push({ userId: { like: user } });
    });
  }

  let filterData = {};
  if (locations.length === 0 && users.length === 0) {
    filterData = {
      filter: {
        where: {
          startDate: {
            between: [
              startOfMonth,
              endOfMonth
            ]
          },
          groupId: {
            like: helperService.getGroupId()
          },
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
  }
  else if (locations.length !== 0 && users.length === 0) {
    filterData = {
      filter: {
        where: {
          startDate: {
            between: [
              startOfMonth,
              endOfMonth
            ]
          },
          or: locations,
          groupId: {
            like: helperService.getGroupId()
          },
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
  }
  else if (locations.length === 0 && users.length !== 0) {
    filterData = {
      filter: {
        where: {
          startDate: {
            between: [
              startOfMonth,
              endOfMonth
            ]
          },
          or: users,
          groupId: {
            like: helperService.getGroupId()
          },
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
  }
  else if (locations.length !== 0 && users.length !== 0) {
    filterData = {
      filter: {
        where: {
          startDate: {
            between: [
              startOfMonth,
              endOfMonth
            ]
          },
          and: [
            { or: locations },
            { or: users }
          ],
          groupId: {
            like: helperService.getGroupId()
          },
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
  }

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

          reminders.sort(function (a, b) {
            var dateA = new Date(a.startDate), dateB = new Date(b.startDate);
            return dateA - dateB;
          });

          dispatch(setReminders(reminders, filterData, selectedLocations, selectedUsers));
        }
      })
      .catch(err => {
        dispatch(fetchRemindersFailed(err));
      });
  }
}

export const getRemindersForCrud = (filterData) => {
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

          reminders.sort(function (a, b) {
            var dateA = new Date(a.startDate), dateB = new Date(b.startDate);
            return dateA - dateB;
          });

          dispatch(setRemindersForCrud(reminders, filterData));
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

export const createReminder = (reminderData, filterData) => {
  return dispatch => {
    calendarService.createReminderService(reminderData)
      .then((response) => {

        dispatch(getRemindersForCrud(filterData));
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

        dispatch(getRemindersForCrud(filterData));
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

export const updateReminderFail = (error, index) => {
  return {
    type: actionTypes.UPDATE_REMINDER_FAIL,
    errorObj: error,
    index: index
  };
};

export const updateReminder = (id, index, reminderData, filterData) => {
  return dispatch => {
    dispatch(updateReminderStart(index));
    calendarService.updateReminderService(id, reminderData)
      .then(response => {
        dispatch(updateReminderSuccess(response.id));
        dispatch(getRemindersForCrud(filterData));
      })
      .catch(error => {
        dispatch(updateReminderFail(error, index))
      });
  }
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
    errorObj: err,
    status: false,
  };
}
