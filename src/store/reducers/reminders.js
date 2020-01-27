import * as actionTypes from "../actions/actionTypes";

const initialState = {
  reminders: null,
  doctors:null,
  error: false
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Object.keys([], source);
  const destClone = Object.keys([], destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: "test" });
  return destClone;
};

const createReminder = (prevState, action) => {
console.log('reducer create reminder');
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REMINDERS:
      return {
        ...prevState,
        reminders: action.reminders,
        error: false
      };
    case actionTypes.FETCH_REMINDERS_FAILED:
      return {
        ...prevState,
        error: true
      };
    case actionTypes.CREATE_REMINDER:
      return createReminder(prevState, action);
    case actionTypes.UPDATE_REMINDER:
      return updateReminder(prevState, action);
    case actionTypes.DELETE_REMINDER:
      return deleteReminder(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
