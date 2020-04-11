import * as actionTypes from "../actions/actionTypes";
import { helperService } from "../../services/helper"

const initialState = {
  reminders: null,
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
  result.splice(action.index, 1);
  const updatedState = {
      reminders: result,
  }

  return updateObject(state.reminders, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAN_REMINDERERROR:
      return {
        ...state,
        error: false
      };
    case actionTypes.SET_REMINDERS:
      return {
        ...state,
        reminders: action.reminders,
        error: false
      };
    case actionTypes.FETCH_REMINDERS_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.CREATE_REMINDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case actionTypes.CREATE_REMINDER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        statusText: helperService.getErrorMessage(action.errorObj)
      };
    case actionTypes.DELETE_REMINDER_SUCCESS:
      return {
        ...state,
        reminderId: action.reminderId,
        loading: false,
        error: false
      };
    case actionTypes.UPDATE_REMINDER_START: return spliceLocation(state, action);
    case actionTypes.UPDATE_REMINDER_SUCCESS:
      return {
        ...state,
        reminderId: action.reminderId,
        loading: false,
        error: false
      };
    case actionTypes.UPDATE_REMINDER_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
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
