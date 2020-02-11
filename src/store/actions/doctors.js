import * as actionTypes from './actionTypes';
import Api from '../../api';

export const setDoctors = (doctors) => {
    return {
        type: actionTypes.SET_DOCTORS,
        doctors: doctors
    };
};

export const fetchDoctorsFailed = (error) => {
    return {
        type: actionTypes.FETCH_DOCTORS_FAILED
    };
};

export const initDoctors = () => {
    return dispatch => {
        Api.get('/users')
            .then(res => {
                const doctors = [];
                res.data.forEach(element => {
                    doctors.push({
                        ...element
                    });
                });
                dispatch(setDoctors(doctors));
            })
            .catch(err => {
                dispatch(fetchDoctorsFailed());
            });
    }
}