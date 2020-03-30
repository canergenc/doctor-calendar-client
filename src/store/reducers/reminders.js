import * as actionTypes from "../actions/actionTypes";
import { helperService } from "../../services/helper"

const initialState = {
  reminders: null,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
      const newReminder = {
        ...action.reminderData,
        id: action.reminderId
      };
      return {
        ...state,
        loading: false,
        reminders: state.orders.concat(newReminder)
      };
    case actionTypes.CREATE_REMINDER_FAIL:
      return {
        ...state,
        loading: false,
        error:true
      };
    case actionTypes.DELETE_REMINDER_SUCCESS:
      return {
        reminderId: action.reminderId
      };

      

      case actionTypes.CALENDAR_BULKUPDATE_REQUEST:
      return {
        loading:true
      };

      case actionTypes.CALENDAR_BULKUPDATE_SUCCESS:
      return {
        loading:false,
        error:false,
        response: action.response
      };

      case actionTypes.CALENDAR_BULKUPDATE_FAILURE:
      return {
        loading:false,
        error:true,
        response:{},
        statusText: helperService.getErrorMessage(action.erorObj)
      };

     
    default:
      return state;
  }
};

export default reducer;
