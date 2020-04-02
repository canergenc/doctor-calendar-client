import * as actionTypes from "../actions/actionTypes";

const initialState = {
    curMonth: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURMONTH:
            return {
                ...state,
                curMonth: action.curMonth
            };
        default:
            return state;
    }
};

export default reducer;
