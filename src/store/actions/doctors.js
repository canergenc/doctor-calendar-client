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
        Api.get('/doctors.json')
            .then(res => {
                const doctors = [];
                for (let key in res.data) {
                    if (key !== "0") {
                        doctors.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                }
                dispatch(setDoctors(doctors));
            })
            .catch(err => {
                dispatch(fetchDoctorsFailed());
            });
    }
}