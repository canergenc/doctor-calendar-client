import * as actionTypes from './actionTypes';

export const setCurMonth = (curMonth) => {
    return {
        type: actionTypes.SET_CURMONTH,
        curMonth: curMonth
    };
};