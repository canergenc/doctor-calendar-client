import * as actionTypes from "../actions/actionTypes";
import { helperService } from "../../services/helper";

const initialState = {
  reminders: null,
  removedReminder: null,
  error: false
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

const spliceLocation = (state, action) => {
  const result = Array.from(state.reminders);
  const [removed] = result.splice(action.index, 1);
  const updatedState = {
    reminders: result,
    removedReminder: removed
  }

  return updateObject(state, updatedState);
};

const rollbackSpliceLocation = (state, action) => {
  const result = Array.from(state.reminders);
  result.splice(action.index, 0, state.removedReminder);
  const updatedState = {
    reminders: result,
    removedReminder: null,
    loading: false,
    error: true,
    statusText: helperService.getErrorMessage(action.errorObj)
  }

  return updateObject(state, updatedState);
};

const updateReminderSuccess = (state, action) => {
  const updatedState = {
    reminderId: action.reminderId,
    loading: false,
    error: false
  }
  return updateObject(state, updatedState);
}

const fetchRemindersFailed = (state, action) => {
  return updateObject(state, { error: true });
}

const deleteReminderSuccess = (state, action) => {
  const updatedState = {
    reminderId: action.reminderId,
    loading: false,
    error: false
  }
  return updateObject(state, updatedState);
}

const createReminderFailed = (state, action) => {
  const updatedState = {
    loading: false,
    error: true,
    statusText: helperService.getErrorMessage(action.errorObj)
  }
  return updateObject(state, updatedState);
}

const createReminderSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: false });
}

const cleanReminderError = (state, action) => {
  return updateObject(state, { error: false });
}

const setReminders = (state, action) => {
  const updatedState = {
    reminders: action.reminders,
    error: false
  };
  return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CALENDAR_BULKUPDATE_REQUEST:
      return {
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
    case actionTypes.APPROVED_REMINDERS_REQUEST:
      return {
        approveReqLoading: true
      };
    case actionTypes.APPROVED_REMINDERS_SUCCESS:
      return {
        ...state,
        approveReqLoading: false,
        approvedReminders: action.approvedReminders,
        error: false
      };
    case actionTypes.APPROVED_REMINDERS_FAILURE:
      return {
        ...state,
        approveReqLoading: false,
        error: true,
        statusTextAtApproved: helperService.getErrorMessage(action.erorObj)
      };
    case actionTypes.WAITING_FOR_APPROVE_REMINDERS_REQUEST:
      return {
        waitingForApproveReqLoading: true
      };

    case actionTypes.WAITING_FOR_APPROVE_REMINDERS_SUCCESS:
      return {
        ...state,
        waitingForApproveReqLoading: false,
        waitingForApproveReminders: action.waitingForApproveReminders,
        error: false
      };

    case actionTypes.WAITING_FOR_APPROVE_REMINDERS_FAILURE:
      return {
        ...state,
        waitingForApproveReqLoading: false,
        error: true,
        statusTextAtWaitingForApprove: helperService.getErrorMessage(action.erorObj)
      };
    case actionTypes.CLEAN_REMINDER_ERROR: return cleanReminderError(state, action);
    case actionTypes.SET_REMINDERS: return setReminders(state, action);
    case actionTypes.FETCH_REMINDERS_FAILED: return fetchRemindersFailed(state, action);
    case actionTypes.CREATE_REMINDER_SUCCESS: return createReminderSuccess(state, action);
    case actionTypes.CREATE_REMINDER_FAIL: return createReminderFailed(state, action);
    case actionTypes.DELETE_REMINDER_SUCCESS: return deleteReminderSuccess(state, action);
    case actionTypes.UPDATE_REMINDER_START: return spliceLocation(state, action);
    case actionTypes.UPDATE_REMINDER_SUCCESS: return updateReminderSuccess(state, action);
    case actionTypes.UPDATE_REMINDER_FAIL: return rollbackSpliceLocation(state, action);
    case actionTypes.CALENDAR_BULKUPDATE_REQUEST:
      return {
        loading: true
      };
    case actionTypes.CALENDAR_BULKUPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        response: action.response
      };
    case actionTypes.CALENDAR_BULKUPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        response: {},
        statusText: helperService.getErrorMessage(action.errorObj)
      };
    default:
      return state;
  }
};

export default reducer;
