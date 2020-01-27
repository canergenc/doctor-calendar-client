import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders';

export const setReminders = (reminders) => {
  return {
    type: actionTypes.SET_REMINDERS,
    reminders: reminders
  };
};

export const fetchRemindersFailed = () => {
  return {
    type: actionTypes.FETCH_REMINDERS_FAILED
  };
};

//Initial
export const initReminders = () => {
  console.log('initReminders');
  return dispatch => {
    axios.get('/locations.json')
      .then(res => {

        const reminders = [];
        for (let key in res.data) {
          if (key !== "0") {
            reminders.push({
              ...res.data[key].calendar,
              id: key
            });
          }
        }
        console.log(reminders);
        dispatch(setReminders(reminders));

      })
      .catch(err => {
        dispatch(fetchRemindersFailed());
      });
  }
}

// Action creators
const createReminderAction = reminder => {
  console.log('test 2')
  console.log(reminder)

  return {
    type: actionTypes.CREATE_REMINDER,
    reminder: reminder
  };
};


const updateReminderAction = reminder => {
  return {
    type: actionTypes.UPDATE_REMINDER,
    reminder: reminder
  };
};

const deleteReminderAction = (date, id) => {
  return {
    type: actionTypes.DELETE_REMINDER,
    date: date,
    id: id
  };
};

// Actions
export const createReminder = payload => {
  console.log('test');
  console.log(payload);

  return dispatch => {
    dispatch(createReminderAction(payload));
  };
};

export const updateReminder = payload => {
  return dispatch => {
    dispatch(updateReminderAction(payload));
  };
};

export const deleteReminder = (date, id) => {
  return dispatch => {
    dispatch(deleteReminderAction(date, id));
  };
};
