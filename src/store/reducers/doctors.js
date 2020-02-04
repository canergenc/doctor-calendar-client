import * as actionTypes from '../actions/actionTypes';

const initialState = {
    doctors: null,
    error: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DOCTORS:
            return {
                ...state,
                doctors: action.doctors,
                error: false
            };
        case actionTypes.FETCH_DOCTORS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;