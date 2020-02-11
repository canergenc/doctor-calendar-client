import * as actionTypes from "../actions/actionTypes";

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
    case actionTypes.DELETE_REMINDER_SUCCESS:
      return {
        reminderId:action.reminderId
      };
    default:
      return state;
  }
};

export default reducer;
