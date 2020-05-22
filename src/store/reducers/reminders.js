import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../utility';
import { helperService } from "../../services/helper";

const initialState = {
  reminders: null,
  removedReminder: null,
  filterData: null,
  selectedLocations: [],
  selectedUsers: [],
  downloading: false,
  error: false
};

const updateRemiderStart = (state, action) => {
  const result = Array.from(state.reminders);
  const [removed] = result.splice(action.index, 1);
  const updatedState = {
    reminders: result,
    removedReminder: removed
  }

  return updateObject(state, updatedState);
};

const updateReminderFail = (state, action) => {
  const result = Array.from(state.reminders);
  result.splice(action.index, 0, state.removedReminder);
  const updatedState = {
    reminders: result,
    removedReminder: null,
    loading: false,
    error: true,
    crudSuccess: false,
    statusText: helperService.getErrorMessage(action.errorObj)
  }

  return updateObject(state, updatedState);
};

const updateReminderSuccess = (state, action) => {
  const updatedState = {
    reminderId: action.reminderId,
    loading: false,
    error: false,
    crudSuccess: true
  }
  return updateObject(state, updatedState);
}

const deleteReminderSuccess = (state, action) => {
  const updatedState = {
    reminderId: action.reminderId,
    loading: false,
    error: false,
    crudSuccess: true
  }
  return updateObject(state, updatedState);
}

const deleteReminderFail = (state, action) => {
  const updatedState = {
    reminderId: action.reminderId,
    loading: false,
    error: true,
    crudSuccess: false
  }
  return updateObject(state, updatedState);
}

const createReminderFailed = (state, action) => {
  const updatedState = {
    loading: false,
    error: true,
    crudSuccess: false,
    statusText: helperService.getErrorMessage(action.errorObj)
  }
  return updateObject(state, updatedState);
}

const createReminderSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: false, crudSuccess: true });
}

const cleanFlags = (state, action) => {
  return updateObject(state, { error: false, crudSuccess: false });
}

const setReminders = (state, action) => {
  const updatedState = {
    reminders: action.reminders,
    filterData: action.filterData,
    selectedLocations: action.selectedLocations,
    selectedUsers: action.selectedUsers,
    error: false
  };
  return updateObject(state, updatedState);
}

const fetchRemindersFailed = (state, action) => {
  const updatedState = {
    loading: false,
    crudSuccess: false,
    error: true,
    statusText: helperService.getErrorMessage(action.errorObj)
  };  
  return updateObject(state, updatedState);
}

const setRemindersForCrud = (state, action) => {
  const updatedState = {
    reminders: action.reminders,
    filterData: action.filterData,
    error: false
  };
  return updateObject(state, updatedState);
}

const startDownloading = (state, action) => {
  return updateObject(state, { downloading: true });
}

const endDownloading = (state, action) => {
  return updateObject(state, { downloading: false });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CALENDARSCOUNT_REQUEST:
      return {
        ...state,
        getCalendarReqloading: true
      };
    case actionTypes.GET_CALENDARSCOUNT_SUCCESS:
      return {
        ...state,
        getCalendarReqloading: false,
        getCalendarsCountError: false,
        calendarsCount: action.response
      };
    case actionTypes.GET_CALENDARSCOUNT_FAILURE:
      return {
        ...state,
        getCalendarReqloading: false,
        getCalendarsCountError: true,
        calendarsCount: {},
        statusTextAtCalendarsCount: helperService.getErrorMessage(action.errorObj)
      };
    case actionTypes.CALENDAR_BULKUPDATE_REQUEST:
      return {
        ...state,
        bulkUpdateReqloading: true
      };
    case actionTypes.CALENDAR_BULKUPDATE_SUCCESS:
      return {
        ...state,
        bulkUpdateReqloading: false,
        error: false,
        response: action.response
      };
    case actionTypes.CALENDAR_BULKUPDATE_FAILURE:
      return {
        ...state,
        bulkUpdateReqloading: false,
        error: true,
        response: {},
        statusTextAtBulkUpdate: helperService.getErrorMessage(action.errorObj)
      };
    case actionTypes.REMINDER_CLEAN_FLAGS: return cleanFlags(state, action);
    case actionTypes.SET_REMINDERS: return setReminders(state, action);
    case actionTypes.SET_REMINDERS_FOR_CRUD: return setRemindersForCrud(state, action);
    case actionTypes.FETCH_REMINDERS_FAILED: return fetchRemindersFailed(state, action);
    case actionTypes.CREATE_REMINDER_SUCCESS: return createReminderSuccess(state, action);
    case actionTypes.CREATE_REMINDER_FAIL: return createReminderFailed(state, action);
    case actionTypes.DELETE_REMINDER_SUCCESS: return deleteReminderSuccess(state, action);
    case actionTypes.DELETE_REMINDER_FAIL: return deleteReminderFail(state, action);
    case actionTypes.UPDATE_REMINDER_START: return updateRemiderStart(state, action);
    case actionTypes.UPDATE_REMINDER_SUCCESS: return updateReminderSuccess(state, action);
    case actionTypes.UPDATE_REMINDER_FAIL: return updateReminderFail(state, action);
    case actionTypes.START_DOWNLOADING: return startDownloading(state, action);
    case actionTypes.END_DOWNLOADING: return endDownloading(state, action);
    default:
      return state;
  }
};

export default reducer;
